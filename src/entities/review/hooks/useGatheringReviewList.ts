import { QUERY_KEYS } from '@/shared/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getGatheringReviewList } from '../api/services';
import type { ReviewFilterProps, ReviewListResponse } from '../model/type';

export const useGatheringReviewList = (
  gatheringId: number,
  params: Omit<ReviewFilterProps, 'gatheringId'>,
) => {
  return useQuery<ReviewListResponse>({
    queryKey: QUERY_KEYS.gathering.reviews(gatheringId, params),
    queryFn: () => getGatheringReviewList(gatheringId, params),
    placeholderData: keepPreviousData,
  });
};
