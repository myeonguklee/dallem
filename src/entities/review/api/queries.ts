import { GatheringType } from '@/entities/gathering/model/types';
import { CreateReviewPayload } from '@/entities/review/model/schema';
import {
  CreateReviewResponse,
  ReviewFilterParams,
  ReviewListResponse,
  ReviewScoreItem,
} from '@/entities/review/model/type';
import { QUERY_KEYS } from '@/shared/api';
import { ApiError } from '@/shared/api';
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query';
import { createReview, getGatheringReviewList, getReviewList, getReviewScore } from './services';

// 리뷰 점수 조회
export const useGetReviewScore = (type?: GatheringType) => {
  return useSuspenseQuery<ReviewScoreItem[], Error>({
    queryKey: QUERY_KEYS.review.scores({ type }),
    queryFn: () => getReviewScore({ type }),
  });
};

// 리뷰 리스트 무한스크롤
export const useGetReviewListInfinite = (filters: ReviewFilterParams) => {
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

// 리뷰 조회
export const useGetReviews = (params: ReviewFilterParams, options?: { enabled?: boolean }) => {
  return useQuery<ReviewListResponse>({
    queryKey: QUERY_KEYS.review.list(params),
    queryFn: () => getReviewList(params),
    enabled: options?.enabled ?? true,
  });
};

// 리뷰 생성
export const useCreateReview = () => {
  const queryClient = useQueryClient();
  return useMutation<CreateReviewResponse, ApiError, CreateReviewPayload>({
    mutationFn: (payload) => createReview(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.review.base });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.gathering.base });
    },
  });
};

// 특정 모임 리뷰 조회
export const useGetGatheringReviewList = (
  gatheringId: number,
  params: Omit<ReviewFilterParams, 'gatheringId'>,
) => {
  return useQuery<ReviewListResponse>({
    queryKey: QUERY_KEYS.gathering.reviews(gatheringId, params),
    queryFn: () => getGatheringReviewList(gatheringId, params),
    placeholderData: keepPreviousData,
  });
};
