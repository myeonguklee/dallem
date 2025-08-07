import React from 'react';
import { useTranslations } from 'next-intl';
import type { CreateGatheringPayload } from '@/entities/gathering/model/schema';
import { useImageProcessingToast, useImageResizer } from '@/shared/lib/hooks';
import { FieldError, UseFormSetValue, UseFormWatch } from 'react-hook-form';

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

  // 토스트 처리 훅 사용
  const { createProgressToast, showProgressToast, showSuccessToast, showErrorToast } =
    useImageProcessingToast();

  // 이미지 리사이징 훅 사용
  const { isProcessing, fileName, displayFileName, handleImageChange } = useImageResizer({
    sizeConfig: 'gathering',
    onSuccess: (file) => {
      setValue('image', file);
      showSuccessToast();
    },
    onError: (error) => {
      console.error('이미지 처리 오류:', error);
      showErrorToast(error);
    },
  });

  // 커스텀 훅에서 제공하는 handleImageChange를 래핑하여 토스트 처리 추가
  const handleImageChangeWithToast = async (file: File | null) => {
    if (!file) {
      setValue('image', undefined);
      return;
    }

    // 진행률 토스트 생성
    createProgressToast();

    // 진행률 업데이트 함수
    const updateProgress = (progress: number) => {
      showProgressToast(progress);
    };

    // 커스텀 훅의 handleImageChange 호출 (진행률 콜백 전달)
    await handleImageChange(file, updateProgress);
  };

  // isProcessing 상태가 변경될 때 부모 컴포넌트에 알림
  React.useEffect(() => {
    onProcessingChange?.(isProcessing);
  }, [isProcessing, onProcessingChange]);

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
            {fileName ? displayFileName : t('form.imagePlaceholder')}
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
          onChange={(e) => handleImageChangeWithToast(e.target.files?.[0] || null)}
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
