import { QUERY_KEYS } from '@/shared/api';
import { useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';
import { ReviewFilterProps, ReviewListResponse, ReviewScoreItem, ReviewType } from '../model/type';
import { getReviewList, getReviewScore } from './services';

// 리뷰 점수 조회
export const useGetReviewScore = (type?: ReviewType) => {
  return useSuspenseQuery<ReviewScoreItem[], Error>({
    queryKey: QUERY_KEYS.review.scores({ type }),
    queryFn: () => getReviewScore({ type }),
  });
};

//

// 리뷰리스트 무한스크롤
export const useGetReviewListInfinite = (filters: ReviewFilterProps) => {
  return useSuspenseInfiniteQuery<ReviewListResponse>({
    queryKey: QUERY_KEYS.review.list(filters),
    queryFn: ({ pageParam = 0 }) => {
      const limit = Number(filters.limit ?? 10);
      const offset = (pageParam as number) * limit;

      return getReviewList({ ...filters, offset, limit });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage;
      if (currentPage <= totalPages - 1) return currentPage;
      return undefined;
    },
  });
};
