'use client';

import { useTranslations } from 'next-intl';
import { REVIEW_QUERY_KEYS } from '@/entities/review/api/queryKeys';
import { getReviewList } from '@/entities/review/api/reviewApi';
import { ReviewFilterProps, ReviewListResponse } from '@/entities/review/model/type';
import { ReviewCard } from '@/entities/review/ui/ReviewCard';
import { InfiniteScrollObserver } from '@/shared/ui/InfiniteScrollObserver/InfiniteScrollObserver';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

interface Props {
  filters: ReviewFilterProps;
}

export const ReviewList = ({ filters }: Props) => {
  // i18n 문자 변환
  const t = useTranslations('pages.reviews');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery<ReviewListResponse>({
      queryKey: REVIEW_QUERY_KEYS.review.list(filters),
      queryFn: ({ pageParam = 0 }) => {
        const limit = Number(filters.limit ?? 10);
        const offset = (pageParam as number) * limit;
        console.log(`Requesting page: ${pageParam}, limit: ${limit}, offset: ${offset}`);

        return getReviewList({ ...filters, offset, limit });
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        const { currentPage, totalPages } = lastPage;
        if (currentPage <= totalPages - 1) return currentPage;
        return undefined;
      },
    });

  // 새로 창조된 data , 하나의 배열로 합치기
  const allReviews = data.pages.flatMap((page) => page.data);

  if (allReviews.length === 0) {
    return <div>{t('noReview')} 😶</div>;
  }
  return (
    <>
      <div className="overflow-y-hidden">
        <ul className="space-y-6">
          {allReviews.map((review) => (
            <li key={review.id}>
              <ReviewCard
                score={review.score}
                comment={review.comment}
                dateTime={review.createdAt}
                userName={review.User?.name}
                userImg={review.User?.image}
                reviewImg={review.Gathering?.image}
                gatheringName={review.Gathering?.name}
                location={review.Gathering?.location}
              />
            </li>
          ))}
        </ul>
        <InfiniteScrollObserver
          onFetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </>
  );
};
