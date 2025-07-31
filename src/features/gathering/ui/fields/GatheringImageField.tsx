import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import type { CreateGatheringPayload } from '@/entities/gathering/model/schema';
import { IMAGE_SIZE_CONFIG, imageResizer } from '@/shared/lib/image';
import { FieldError, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import toast from 'react-hot-toast';

interface GatheringImageFieldProps {
  setValue: UseFormSetValue<CreateGatheringPayload>;
  error?: FieldError;
  watch: UseFormWatch<CreateGatheringPayload>;
  onProcessingChange?: (isProcessing: boolean) => void;
}

export const GatheringImageField = ({
  setValue,
  error,
  watch,
  onProcessingChange,
}: GatheringImageFieldProps) => {
  const t = useTranslations('pages.gatherings.create');
  const [fileName, setFileName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const progressToastIdRef = useRef<string | null>(null);

  const handleImageChange = async (file: File | null) => {
    if (!file) {
      setValue('image', undefined);
      setFileName('');
      return;
    }

    // 파일 유효성 검사
    if (!file.type.startsWith('image/')) {
      toast.error(t('form.errors.imageType'));
      return;
    }

    // 파일 크기 제한 (20MB)
    const MAX_FILE_SIZE = 20 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      toast.error(t('form.errors.fileSize'));
      return;
    }

    // 지원하는 이미지 형식 확인
    const supportedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!supportedTypes.includes(file.type)) {
      toast.error(t('form.errors.unsupportedType'));
      return;
    }

    // 이미 처리 중인지 확인
    if (imageResizer.isCurrentlyProcessing()) {
      toast.error(t('form.errors.processing'));
      return;
    }

    setIsProcessing(true);
    onProcessingChange?.(true);
    setFileName(file.name);

    try {
      // 진행률 토스트 생성
      const toastId = toast.loading(t('form.processing.progress', { progress: 0 }), {
        duration: Infinity,
      });
      progressToastIdRef.current = toastId;

      // 진행률 업데이트 함수
      const updateProgress = (progress: number) => {
        if (progressToastIdRef.current) {
          toast.loading(t('form.processing.progress', { progress }), {
            id: progressToastIdRef.current,
          });
        }
      };

      // 이미지 리사이징
      const result = await imageResizer.resizeImage(
        file,
        {
          ...IMAGE_SIZE_CONFIG.gathering,
          format: 'webp',
        },
        updateProgress,
      );

      // Blob을 File로 변환
      const resizedFile = new File([result.blob], file.name.replace(/\.[^/.]+$/, '.webp'), {
        type: 'image/webp',
      });

      // 폼에 설정
      setValue('image', resizedFile);
      setFileName(resizedFile.name);

      // 완료 토스트 (3초 후 자동 닫힘)
      if (progressToastIdRef.current) {
        toast.success(t('form.processing.complete'), {
          id: progressToastIdRef.current,
          duration: 3000, // 3초
        });
        progressToastIdRef.current = null;
      }
    } catch (error) {
      console.error('이미지 처리 오류:', error);
      let errorMessage = t('form.errors.default');
      if (error && typeof error === 'object' && 'code' in error) {
        switch ((error as { code: string }).code) {
          case 'TIMEOUT':
            errorMessage = t('form.errors.timeout');
            break;
          case 'MEMORY':
            errorMessage = t('form.errors.memory');
            break;
          case 'UNSUPPORTED_TYPE':
            errorMessage = t('form.errors.unsupportedType');
            break;
          case 'CORRUPTED':
            errorMessage = t('form.errors.corrupted');
            break;
          case 'PROCESSING':
            errorMessage = t('form.errors.processing');
            break;
          case 'FILE_SIZE':
            errorMessage = t('form.errors.fileSize');
            break;
          case 'IMAGE_TYPE':
            errorMessage = t('form.errors.imageType');
            break;
          default:
            errorMessage = t('form.errors.default');
        }
      }
      if (progressToastIdRef.current) {
        toast.error(errorMessage, {
          id: progressToastIdRef.current,
          duration: 3000,
        });
        progressToastIdRef.current = null;
      }
      setValue('image', file);
      setFileName(file.name);
    } finally {
      setIsProcessing(false);
      onProcessingChange?.(false);
    }
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium">{t('form.image')}</label>
      <div className="flex w-full items-center gap-2">
        <div
          className={
            'flex-1 rounded-xl border-0 bg-gray-50 px-4 py-2.5' + (error ? ' border-red-500' : '')
          }
        >
          <span className={watch('image') ? 'text-gray-800' : 'text-gray-400'}>
            {fileName || t('form.imagePlaceholder')}
          </span>
          {isProcessing && (
            <span className="ml-2 text-sm text-orange-500">{t('form.processing.status')}</span>
          )}
        </div>
        <button
          type="button"
          className="rounded-xl border border-orange-500 bg-white px-4 py-2 font-semibold text-orange-500 transition hover:bg-orange-50 focus:outline-none disabled:opacity-50"
          onClick={() => document.getElementById('gathering-image-upload')?.click()}
          disabled={isProcessing}
        >
          {isProcessing ? t('form.processing.status') : t('form.imageButton')}
        </button>
        <input
          type="file"
          accept="image/*"
          id="gathering-image-upload"
          className="hidden"
          onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
          disabled={isProcessing}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{t(error.message ?? '')}</p>}
      {isProcessing && (
        <p className="mt-1 text-xs text-orange-500">{t('form.processing.waitMessage')}</p>
      )}
    </div>
  );
};
