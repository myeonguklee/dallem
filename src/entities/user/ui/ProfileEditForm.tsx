import { useTranslations } from 'next-intl';
import { UpdateUserPayload, updateUserSchema } from '@/entities/user/model';
import { useImageProcessingToast, useImageResizer } from '@/shared/lib/hooks';
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
  const t = useTranslations('pages.myPage.form');
  const { isPending, mutate } = useUpdateUser();

  // 토스트 처리 훅 사용
  const { createProgressToast, showProgressToast, showSuccessToast, showErrorToast } =
    useImageProcessingToast();

  // 이미지 리사이징 훅 사용
  const { isProcessing, fileName, displayFileName, handleImageChange } = useImageResizer({
    sizeConfig: 'profile',
    onSuccess: (file) => {
      setValue('image', file);
      showSuccessToast();
    },
    onError: (error) => {
      console.error('이미지 처리 오류:', error);
      showErrorToast(error);
    },
  });

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
      toast.error(t('imageProcessing'));
      return;
    }

    mutate(data, {
      onSuccess: () => {
        toast.success(t('success'));
        onClose();
      },
    });
  };

  // 커스텀 훅에서 제공하는 handleImageChange를 래핑하여 토스트 처리 추가
  const handleImageChangeWithToast = async (file: File | null) => {
    if (!file) {
      setValue('image', null);
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="image"
            className="mb-2 block text-sm font-medium"
          >
            {t('profileImage')}
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
                {fileName ? displayFileName : t('imagePlaceholder')}
              </span>
              {isProcessing && (
                <span className="ml-2 text-sm text-orange-500">{t('processing.status')}</span>
              )}
            </div>
            <button
              type="button"
              className="rounded-xl border border-orange-500 bg-white px-4 py-2 font-semibold text-orange-500 transition hover:bg-orange-50 focus:outline-none disabled:opacity-50"
              onClick={() => document.getElementById('profile-image-upload')?.click()}
              disabled={isProcessing}
            >
              {isProcessing ? t('processing.status') : t('imageButton')}
            </button>
            <input
              type="file"
              accept="image/*"
              id="profile-image-upload"
              className="hidden"
              onChange={(e) => handleImageChangeWithToast(e.target.files?.[0] || null)}
              disabled={isProcessing}
            />
          </div>
          {errors.image && (
            <p className="mt-1 text-xs text-red-500">{t(errors.image.message ?? '')}</p>
          )}
          {isProcessing && (
            <p className="mt-1 text-xs text-orange-500">{t('processing.waitMessage')}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="companyName"
            className="mb-2 block text-sm font-medium"
          >
            {t('companyName')}
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
            {t('email')}
          </label>
          <input
            type="email"
            id="email"
            value={email}
            disabled
            className="w-full cursor-not-allowed rounded-xl border border-gray-300 bg-gray-50 px-4 py-2 text-gray-500"
          />
          <p className="mt-1 text-xs text-gray-500">{t('emailReadOnly')}</p>
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          {t('cancel')}
        </button>
        <button
          type="submit"
          disabled={isPending || isProcessing}
          className="flex-1 rounded-xl bg-orange-500 px-4 py-2 font-semibold text-white transition hover:bg-orange-600 disabled:opacity-50"
        >
          {isPending ? t('submitting') : isProcessing ? t('imageProcessing') : t('submit')}
        </button>
      </div>
    </form>
  );
};
