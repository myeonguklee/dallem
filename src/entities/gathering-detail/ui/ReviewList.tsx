import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useGatheringReviewList } from '@/entities/review/hooks/useGatheringReviewList';
import { ReviewCard } from '@/entities/review/ui/ReviewCard';
import { Pagination } from '@/shared/ui/pagination';

export const ReviewList = ({ id }: { id: number }) => {
  const t = useTranslations('pages.gathering.detail');
  // 페이지당 리뷰 개수 설정
  // 상수 코드 추후 분리
  const PAGE_SIZE = 4;

  const [page, setPage] = useState(1);
  const offset = (page - 1) * PAGE_SIZE;

  const { data, isLoading } = useGatheringReviewList(id, {
    offset,
    limit: PAGE_SIZE,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  const reviews = data?.data;
  const totalPages = data?.totalPages ?? 0;
  const isEmpty = !reviews || reviews.length === 0;

  if (isLoading) {
    return <div className="flex h-full items-center justify-center">{t('loading')}</div>;
  }

  if (isEmpty) {
    return (
      <div className="mt-10 flex h-full flex-grow justify-center">
        <p className="text-gray-500">{t('emptyReview')}</p>
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col justify-between">
      {/* 리뷰 카드 리스트 */}
      <div className="space-y-4">
        {/* 각 카드 사이에 수직 간격 추가 */}
        {reviews.map((review) => (
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
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};
