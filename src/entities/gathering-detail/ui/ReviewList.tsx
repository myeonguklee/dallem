import { ReviewCard } from '@/entities/review/ui/ReviewCard';

export const ReviewList = () => {
  // 여기에 실제 리뷰 데이터를 가져오는 로직이 들어갈 예정
  // 예시로 더미 데이터
  // const reviews = useReviews();
  const reviews = [
    {
      score: 5,
      comment: '정말 유익한 모임이었어요!',
      dateTime: '2025-05-29T12:00:00Z',
      userName: '사용자1',
      gatheringName: '코딩 스터디',
      location: '서울',
    },
    {
      score: 4,
      comment: '다음에도 꼭 참여하고 싶어요!',
      dateTime: '2025-05-29T12:00:00Z',
      userName: '사용자2',
      gatheringName: '디자인 워크숍',
      location: '부산',
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* 여기에 ReviewCard 컴포넌트들을 맵핑해서 넣을 예정 */}
      {reviews.map((review, index) => (
        <ReviewCard
          key={index}
          score={review.score}
          comment={review.comment}
          dateTime={review.dateTime}
          userName={review.userName}
          gatheringName={review.gatheringName}
          location={review.location}
        />
      ))}
    </div>
  );
};
