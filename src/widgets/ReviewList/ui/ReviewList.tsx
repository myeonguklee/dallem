'use client';

import { useTranslations } from 'next-intl';
import { REVIEW_QUERY_KEYS } from '@/entities/review/api/queryKeys';
import { getReviewList } from '@/entities/review/api/reviewApi';
import { ReviewFilterProps, ReviewListResponse } from '@/entities/review/model/type';
import { ReviewCard } from '@/entities/review/ui/ReviewCard';
import { useSuspenseQuery } from '@tanstack/react-query';

interface Props {
  filters: ReviewFilterProps;
}

export const ReviewList = ({ filters }: Props) => {
  // i18n 문자 변환
  const t = useTranslations('pages.reviews');

  const { data, error } = useSuspenseQuery<ReviewListResponse, Error>({
    queryKey: REVIEW_QUERY_KEYS.review.list(filters),
    queryFn: () => getReviewList(filters),
  });

  if (error || !data?.data?.length) {
    return <div>{t('noReview')} 😶</div>;
  }

  return (
    <>
      <div className="mt-8 min-h-[40rem]">
        <ul className="space-y-6">
          {data.data.map((review) => (
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
      </div>
    </>
  );
};
