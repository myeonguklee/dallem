import { useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { mapImageErrorToMessage } from '../utils/imageErrorMapper';

export const useImageProcessingToast = () => {
  const t = useTranslations('common.imageResizer');
  const progressToastIdRef = useRef<string | null>(null);

  const createProgressToast = useCallback(() => {
    const toastId = toast.loading(t('processing.progress', { progress: 0 }), {
      duration: Infinity,
    });
    progressToastIdRef.current = toastId;
    return toastId;
  }, [t]);

  const showProgressToast = useCallback(
    (progress: number) => {
      if (progressToastIdRef.current) {
        toast.loading(t('processing.progress', { progress }), {
          id: progressToastIdRef.current,
        });
      }
    },
    [t],
  );

  const showSuccessToast = useCallback(() => {
    if (progressToastIdRef.current) {
      toast.success(t('processing.complete'), {
        id: progressToastIdRef.current,
        duration: 3000,
      });
      progressToastIdRef.current = null;
    }
  }, [t]);

  const showErrorToast = useCallback(
    (error: unknown) => {
      const message = mapImageErrorToMessage(error, t);
      if (progressToastIdRef.current) {
        toast.error(message, {
          id: progressToastIdRef.current,
          duration: 3000,
        });
        progressToastIdRef.current = null;
      }
    },
    [t],
  );

  return {
    createProgressToast,
    showProgressToast,
    showSuccessToast,
    showErrorToast,
  };
};
