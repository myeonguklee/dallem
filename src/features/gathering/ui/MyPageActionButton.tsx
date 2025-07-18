import { Button } from '@/shared/ui/button';

interface MyPageActionButtonProps {
  gatheringId: number;
  gatheringDateTime: Date;
}

export const MyPageActionButton = ({ gatheringId, gatheringDateTime }: MyPageActionButtonProps) => {
  // 날짜 비교로 상태 결정
  const now = new Date();
  const gatheringDate = new Date(gatheringDateTime);
  const isUpcoming = gatheringDate > now;

  // 사용자 id로 필터링된 리뷰 목록 조회 GatheringId Gathering.id 로 리뷰 작성했는지 조회
  const isReviewWritten = false;

  const canCancel = isUpcoming;
  const canReview = !isUpcoming && !isReviewWritten;

  const handleCancelReservation = async () => {
    // TODO: 예약 취소 로직 구현
  };

  const handleWriteReview = () => {
    // TODO: 리뷰 작성 페이지로 이동 또는 모달 열기
    console.log('리뷰 작성:', gatheringId);
  };

  return (
    <>
      {canCancel && (
        <Button
          variant="outline"
          onClick={handleCancelReservation}
          className="border-orange-500 text-orange-500 hover:bg-orange-50"
        >
          예약 취소하기
        </Button>
      )}
      {canReview && (
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
