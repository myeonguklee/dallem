import { useState } from 'react';
import { useGatheringReviewList } from '@/entities/review/hooks/useGatheringReviewList';
import { ReviewCard } from '@/entities/review/ui/ReviewCard';
import { Pagination } from '@/shared/ui/pagination';

export const ReviewList = ({ id }: { id: number }) => {
  // 페이지당 리뷰 개수 설정
  // 상수 코드 추후 분리 ?
  const PAGE_SIZE = 4;

  const [page, setPage] = useState(1);
  const offset = (page - 1) * PAGE_SIZE;

  const { data } = useGatheringReviewList(id, {
    offset,
    limit: PAGE_SIZE,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  return (
    <>
      {data?.data.map((review) => (
        <ReviewCard
          key={review.id}
          score={review.score}
          comment={review.comment}
          dateTime={review.createdAt}
          userName={review.User.name}
          gatheringName={review.Gathering.name}
          location={review.Gathering.location}
        />
      ))}

      <Pagination
        currentPage={page}
        totalPages={data?.totalPages ?? 1}
        onPageChange={setPage}
      />
    </>
  );
};
