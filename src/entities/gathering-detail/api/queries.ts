import { useTranslations } from 'next-intl';
import { QUERY_KEYS } from '@/shared/api';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { GatheringDetail } from '../model/types';
import { getGatheringById } from './services';
import { cancelGathering, joinGathering, leaveGathering } from './services';

export const useGetGatheringDetail = (id: number) => {
  return useSuspenseQuery<GatheringDetail>({
    queryKey: QUERY_KEYS.gathering.detail(id),

    queryFn: () => getGatheringById(id),

    staleTime: 1000 * 60 * 3, // 3분
  });
};

// 모임 참여
export const useJoinGathering = () => {
  const t = useTranslations('pages.gathering.detail');
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (gatheringId: number) => joinGathering(gatheringId),
    onSuccess: (_, gatheringId) => {
      // 뮤테이션 성공 시
      toast.success(t('joinSuccess'));
      // 모임 상세 정보 쿼리를 무효화
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.gathering.detail(gatheringId),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.gathering.joined(),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.participant.list(gatheringId),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.AUTH.USER.BASE,
      });
    },
  });
};

// 모임 참여 취소
export const useLeaveGathering = () => {
  const t = useTranslations('pages.gathering.detail');
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (gatheringId: number) => leaveGathering(gatheringId),
    onSuccess: (_, gatheringId) => {
      toast.success(t('cancelJoin'));
      // 모임 상세 정보 쿼리를 무효화
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.gathering.detail(gatheringId),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.gathering.joined(),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.participant.list(gatheringId),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.AUTH.USER.BASE,
      });
    },
  });
};

// 모임 취소
export const useCancelGathering = () => {
  const t = useTranslations('pages.gathering.detail');
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (gatheringId: number) => cancelGathering(gatheringId),
    onSuccess: () => {
      toast.success(t('removeGathering'));
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.gathering.base });
    },
  });
};
