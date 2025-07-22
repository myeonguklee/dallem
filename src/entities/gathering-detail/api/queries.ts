import { QUERY_KEYS } from '@/entities/gathering/api';
import { useSuspenseQuery } from '@tanstack/react-query';
import { GatheringDetail } from '../model/types';
import { getGatheringById } from './services';

export const useGetGatheringDetail = (id: number) => {
  return useSuspenseQuery<GatheringDetail>({
    queryKey: QUERY_KEYS.gathering.detail(id),

    queryFn: () => getGatheringById(id),

    staleTime: 1000 * 60 * 3, // 3분
  });
};
