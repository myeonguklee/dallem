import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { UpdateUserPayload, updateUserSchema } from '@/entities/user/model';
import { IMAGE_SIZE_CONFIG, imageResizer } from '@/shared/lib/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useUpdateUser } from '../api/queries';

interface ProfileEditFormProps {
  companyName: string;
  email: string;
  onClose: () => void;
}

export const ProfileEditForm = ({ companyName, email, onClose }: ProfileEditFormProps) => {
  const t = useTranslations('pages.myPage');
  const { isPending, mutate } = useUpdateUser();
  const [fileName, setFileName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const progressToastIdRef = useRef<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateUserPayload>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      companyName: companyName,
      image: null,
    },
  });

  const onSubmit = (data: UpdateUserPayload) => {
    // 이미지 처리 중이면 제출 방지
    if (isProcessing) {
      toast.error(t('form.errors.imageProcessing'));
      return;
    }

    mutate(data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const truncateFileName = (fileName: string, maxLength: number = 20) => {
    if (fileName.length <= maxLength) return fileName;
    const extension = fileName.split('.').pop();
    const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.'));
    return `${nameWithoutExt.substring(0, maxLength - 3)}...${extension ? `.${extension}` : ''}`;
  };

  const handleImageChange = async (file: File | null) => {
    if (!file) {
      setValue('image', null);
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
          ...IMAGE_SIZE_CONFIG.profile,
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
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="image"
            className="mb-2 block text-sm font-medium"
          >
            {t('form.profileImage')}
          </label>
          <div className="flex w-full items-center gap-2">
            <div
              className={
                'flex-1 rounded-xl border border-gray-300 bg-gray-50 px-4 py-2' +
                (errors.image ? ' border-red-500' : '')
              }
            >
              <span
                className={watch('image') ? 'text-gray-800' : 'text-gray-400'}
                title={fileName} // 전체 파일명을 툴팁으로 표시
              >
                {fileName ? truncateFileName(fileName) : t('form.imagePlaceholder')}
              </span>
              {isProcessing && (
                <span className="ml-2 text-sm text-orange-500">{t('form.processing.status')}</span>
              )}
            </div>
            <button
              type="button"
              className="rounded-xl border border-orange-500 bg-white px-4 py-2 font-semibold text-orange-500 transition hover:bg-orange-50 focus:outline-none disabled:opacity-50"
              onClick={() => document.getElementById('profile-image-upload')?.click()}
              disabled={isProcessing}
            >
              {isProcessing ? t('form.processing.status') : t('form.imageButton')}
            </button>
            <input
              type="file"
              accept="image/*"
              id="profile-image-upload"
              className="hidden"
              onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
              disabled={isProcessing}
            />
          </div>
          {errors.image && (
            <p className="mt-1 text-xs text-red-500">{t(errors.image.message ?? '')}</p>
          )}
          {isProcessing && (
            <p className="mt-1 text-xs text-orange-500">{t('form.processing.waitMessage')}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="companyName"
            className="mb-2 block text-sm font-medium"
          >
            {t('form.companyName')}
          </label>
          <input
            type="text"
            id="companyName"
            {...register('companyName')}
            className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none"
          />
          {errors.companyName && (
            <p className="mt-1 text-xs text-red-500">{t(errors.companyName.message ?? '')}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium"
          >
            {t('profile.email')}
          </label>
          <input
            type="email"
            id="email"
            value={email}
            disabled
            className="w-full cursor-not-allowed rounded-xl border border-gray-300 bg-gray-50 px-4 py-2 text-gray-500"
          />
          <p className="mt-1 text-xs text-gray-500">{t('profile.emailReadOnly')}</p>
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          {t('form.cancel')}
        </button>
        <button
          type="submit"
          disabled={isPending || isProcessing}
          className="flex-1 rounded-xl bg-orange-500 px-4 py-2 font-semibold text-white transition hover:bg-orange-600 disabled:opacity-50"
        >
          {isPending
            ? t('form.submitting')
            : isProcessing
              ? t('form.imageProcessing')
              : t('form.submit')}
        </button>
      </div>
    </form>
  );
};
