'use client';

import { useTranslations } from 'next-intl';
import { useLeaveGathering } from '@/entities/gathering-detail/api/queries';
import { CreateReviewBtn } from '@/features/my-page/ui';
import { Button } from '@/shared/ui/button';

interface MyPageActionButtonProps {
  gatheringId: number;
  isCompleted?: boolean;
  isReviewed?: boolean;
  joinedAt?: Date;
}

export const MyPageActionButton = ({
  gatheringId,
  isCompleted,
  isReviewed,
}: MyPageActionButtonProps) => {
  const t = useTranslations('pages.myPage.actionButton');
  const { mutate: leaveGathering } = useLeaveGathering();

  const handleCancelReservation = () => {
    leaveGathering(gatheringId);
  };

  return (
    <>
      {!isCompleted && (
        <Button
          variant="outline"
          onClick={handleCancelReservation}
          className="border-orange-500 px-3 py-1.5 text-orange-500 hover:bg-orange-50"
        >
          {t('cancelReservation')}
        </Button>
      )}
      {isCompleted && !isReviewed && <CreateReviewBtn gatheringId={gatheringId} />}
    </>
  );
};
