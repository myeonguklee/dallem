'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useGetReviewListInfinite } from '@/entities/review/api/queries';
import { ReviewFilterProps } from '@/entities/review/model/type';
import { ReviewCard } from '@/entities/review/ui/ReviewCard';
import { InfiniteScrollObserver } from '@/shared/ui/InfiniteScrollObserver/InfiniteScrollObserver';

interface ReviewListProps {
  filters: ReviewFilterProps;
}

export const ReviewList = ({ filters }: ReviewListProps) => {
  // i18n 문자 변환
  const t = useTranslations('pages.reviews');

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetReviewListInfinite(filters);

  // 새로 창조된 data , 하나의 배열로 합치기
  const allReviews = useMemo(() => {
    return data.pages.flatMap((page) => page.data);
  }, [data.pages]);

  if (allReviews.length === 0) {
    return <div>{t('noReview')} 😶</div>;
  }
  return (
    <>
      <div className="">
        <ul className="space-y-6">
          {allReviews.map((review, idx) => (
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
                idx={idx}
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
