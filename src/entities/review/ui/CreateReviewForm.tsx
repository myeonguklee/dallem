'use client';

import { useTranslations } from 'next-intl';
import { CreateReviewPayload } from '@/entities/review/model/schema';
import { Button } from '@/shared/ui/button';
import { StarIcon } from '@/shared/ui/icon/icons/StarIcon';
import { Control, useController } from 'react-hook-form';

interface CreateReviewFormProps {
  control: Control<CreateReviewPayload>;
  gatheringId: number;
  onSubmit: (data: CreateReviewPayload) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const CreateReviewForm = ({
  control,
  gatheringId,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: CreateReviewFormProps) => {
  const t = useTranslations('pages.myPage.reviewModal');

  const {
    field: { value: selectedScore, onChange: setScore },
  } = useController({
    name: 'score',
    control,
  });

  const {
    field: { value: comment, onChange: setComment },
  } = useController({
    name: 'comment',
    control,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedScore && comment?.trim()) {
      onSubmit({
        gatheringId,
        score: selectedScore,
        comment: comment.trim(),
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <div className="mb-2 text-left text-base font-semibold text-gray-900">{t('question')}</div>
        <div className="mb-4 flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((score) => (
            <button
              key={score}
              type="button"
              onClick={() => setScore(score)}
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
      </div>

      <div>
        <div className="mb-2 text-left text-base font-semibold text-gray-900">
          {t('commentLabel')}
        </div>
        <textarea
          id="comment"
          value={comment || ''}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full resize-none rounded-md bg-gray-50 px-3 py-2 focus:outline-none"
          placeholder={t('commentPlaceholder')}
        />
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
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
  );
};
