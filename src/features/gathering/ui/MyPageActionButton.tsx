import { useLocale } from 'next-intl';
import { useLeaveGathering } from '@/entities/gathering-detail/api/queries';
import { useRouter } from '@/i18n';
import { Button } from '@/shared/ui/button';

interface MyPageActionButtonProps {
  gatheringId: number;
  isCompleted: boolean;
  isReviewed: boolean;
  joinedAt?: Date;
}

export const MyPageActionButton = ({
  gatheringId,
  isCompleted,
  isReviewed,
}: MyPageActionButtonProps) => {
  const router = useRouter();
  const locale = useLocale();
  const { mutate: leaveGathering } = useLeaveGathering();

  const handleCancelReservation = () => {
    // TODO: 예약 취소 로직 구현
    leaveGathering(gatheringId);
  };

  const handleWriteReview = () => {
    // 마이페이지-작성 가능한 리뷰 페이지로 이동
    router.push(`/my-page/reviews`, { locale });
  };

  return (
    <>
      {!isCompleted && (
        <Button
          variant="outline"
          onClick={handleCancelReservation}
          className="border-orange-500 text-orange-500 hover:bg-orange-50"
        >
          예약 취소하기
        </Button>
      )}
      {isCompleted && !isReviewed && (
        <Button
          variant="primary"
          onClick={handleWriteReview}
          className="bg-orange-500 text-white hover:bg-orange-600"
        >
          리뷰 작성하기
        </Button>
      )}
    </>
  );
};
