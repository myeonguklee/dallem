import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Gathering } from '../model/types';
import { GatheringFilters } from '../model/types';
import { QUERY_KEYS } from './queryKeys';
import { createGathering, getGatheringById, getGatherings } from './services';

// 모임 조회
export const useGetGatherings = (filters?: GatheringFilters) => {
  return useQuery<Gathering[]>({
    queryKey: QUERY_KEYS.gathering.list(filters),
    queryFn: () => getGatherings(filters),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });
};

// 모임 상세 조회
export const useGetGathering = (id: number) => {
  return useQuery<Gathering>({
    queryKey: QUERY_KEYS.gathering.detail(id),
    queryFn: () => getGatheringById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 3, // 3분 동안 캐시 유지
  });
};

// 모임 생성 훅
export const useCreateGathering = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGathering,
    onSuccess: () => {
      // 모임 생성이 완료되면 목록 쿼리를 무효화하여 최신 데이터로 갱신
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.gathering.base });
    },
    onError: (error) => {
      console.error('모임 생성 실패:', error);
    },
  });
};
