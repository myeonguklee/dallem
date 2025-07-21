'use client';

import { getReviewList } from '@/entities/review/api/reviewApi';
import { ReviewListResponse } from '@/entities/review/model/type';
import { ReviewCard } from '@/entities/review/ui/ReviewCard';
import { ReviewListFilter } from '@/features/review/ReviewListFilter/ui/ReviewListFilter';
import { ReviewSort } from '@/features/review/ReviewSort/ui/ReviewSort';
import { useQuery } from '@tanstack/react-query';

interface Props {
  type?: string;
  location?: string;
  date?: string;
  sortBy?: string;
  sortOrder?: string;
  limit?: number;
  offset?: number;
}

export const ReviewList = (props: Props) => {
  const { type, location, date, sortBy, sortOrder, limit, offset } = props;

  const { data, isLoading, error } = useQuery<ReviewListResponse>({
    queryKey: ['reviewList', type, location, date, sortBy, sortOrder, limit, offset],
    queryFn: () => getReviewList({ type, location, date, sortBy, sortOrder, limit, offset }),
  });

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <ReviewListFilter />
        <ReviewSort />
      </div>
      <div className="mt-8">
        {isLoading ? (
          <div>리뷰 로딩 중...</div>
        ) : error || !data?.data?.length ? (
          <div>리뷰가 없습니다 😶</div>
        ) : (
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
        )}
      </div>
    </>
  );
};
