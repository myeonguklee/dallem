'use client';

import { useTranslations } from 'next-intl';
import { useCreateReview } from '@/entities/review/api/queries';
import { CreateReviewPayload, createReviewSchema } from '@/entities/review/model/schema';
import { Button } from '@/shared/ui/button';
import { StarIcon } from '@/shared/ui/icon/icons/StarIcon';
import { Modal } from '@/shared/ui/modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

type CreateReviewFormData = CreateReviewPayload;

interface CreateReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  gatheringId: number;
}

export const CreateReviewModal = ({ isOpen, onClose, gatheringId }: CreateReviewModalProps) => {
  const t = useTranslations('pages.myPage.reviewModal');
  const { mutate: createReview } = useCreateReview();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<CreateReviewFormData>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      gatheringId,
      score: undefined,
      comment: '',
    },
  });

  const selectedScore = watch('score');
  const comment = watch('comment');

  const onSubmit = (data: CreateReviewFormData) => {
    createReview(data, {
      onSuccess: () => {
        toast.success(t('success'));
        reset();
        onClose();
      },
    });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal.Root
      isOpen={isOpen}
      onClose={handleClose}
      variant="dialog"
    >
      <Modal.Header>
        <span className="text-lg font-bold">{t('title')}</span>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div>
            <div className="mb-2 text-left text-base font-semibold text-gray-900">
              {t('question')}
            </div>
            <div className="mb-4 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((score) => (
                <button
                  key={score}
                  type="button"
                  onClick={() => setValue('score', score)}
                  aria-label={t('ariaLabel', { score })}
                  className="focus:outline-none"
                >
                  <StarIcon
                    size={32}
                    filled={selectedScore ? score <= selectedScore : false}
                    className={`transition-colors ${selectedScore && score <= selectedScore ? '' : 'opacity-60'}`}
                  />
                </button>
              ))}
            </div>
            {errors.score && errors.score.message && (
              <p className="mt-1 text-left text-sm text-red-600">{t(errors.score.message)}</p>
            )}
          </div>

          <div>
            <div className="mb-2 text-left text-base font-semibold text-gray-900">
              {t('commentLabel')}
            </div>
            <textarea
              id="comment"
              {...register('comment')}
              rows={4}
              className="w-full resize-none rounded-md bg-gray-50 px-3 py-2 focus:outline-none"
              placeholder={t('commentPlaceholder')}
            />
            {errors.comment && errors.comment.message && (
              <p className="mt-1 text-left text-sm text-red-600">{t(errors.comment.message)}</p>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 border-orange-400 bg-white text-orange-500 hover:bg-orange-50"
            >
              {t('cancel')}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !selectedScore || !comment?.trim()}
              className="flex-1"
            >
              {t('submit')}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal.Root>
  );
};
