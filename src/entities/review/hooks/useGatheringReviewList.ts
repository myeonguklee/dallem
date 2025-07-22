import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getGatheringReviewList } from '../api/reviewApi';
import type { ReviewFilterProps, ReviewListResponse } from '../model/type';

export const useGatheringReviewList = (
  gatheringId: number,
  params: Omit<ReviewFilterProps, 'gatheringId'>,
) => {
  return useQuery<ReviewListResponse>({
    queryKey: ['gathering-reviews', gatheringId, params],
    queryFn: () => getGatheringReviewList(gatheringId, params),
    placeholderData: keepPreviousData,
  });
};
