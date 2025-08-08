import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useGetGatheringReviewList } from '@/entities/review/api/queries';
import { REVIEW_PAGE_SIZE } from '@/entities/review/model/constants';
import { ReviewCard } from '@/entities/review/ui/ReviewCard';
import { Pagination } from '@/shared/ui/pagination';

export const DetailPageReviewList = ({ id }: { id: number }) => {
  const t = useTranslations('pages.gathering.detail');

  const [page, setPage] = useState(1);
  const offset = (page - 1) * REVIEW_PAGE_SIZE;

  const { data, isLoading } = useGetGatheringReviewList(id, {
    offset,
    limit: REVIEW_PAGE_SIZE,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  const reviews = data?.data;
  const totalPages = data?.totalPages ?? 0;
  const isEmpty = !reviews || reviews.length === 0;

  if (isLoading) {
    return <div className="flex items-center justify-center py-10">{t('loading')}</div>;
  }

  if (isEmpty) {
    return (
      <div className="flex justify-center py-10">
        <p className="text-gray-500">{t('emptyReview')}</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-between">
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
      <div className="mt-8">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};
