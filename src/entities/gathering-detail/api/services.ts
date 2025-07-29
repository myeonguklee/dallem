import { httpClient } from '@/shared/api';
import { API_ENDPOINTS } from '@/shared/config/api';
import { GatheringDetail } from '../model/types';

export const getGatheringById = async (id: number): Promise<GatheringDetail> => {
  return await httpClient.get<GatheringDetail>(API_ENDPOINTS.GATHERINGS.DETAIL(id));
};

// 모임 참여 join
export const joinGathering = async (gatheringId: number): Promise<void> => {
  await httpClient.post<void>(
    API_ENDPOINTS.GATHERINGS.JOIN(gatheringId),
    {},
    {
      authRequired: true,
    },
  );
};

// 모임 참여 취소 leave
export const leaveGathering = async (gatheringId: number): Promise<void> => {
  await httpClient.delete<void>(API_ENDPOINTS.GATHERINGS.LEAVE(gatheringId), {
    authRequired: true,
  });
};

// 모임 취소 cancel
export const cancelGathering = async (gatheringId: number): Promise<void> => {
  await httpClient.put<void>(
    API_ENDPOINTS.GATHERINGS.CANCEL(gatheringId),
    {},
    {
      authRequired: true,
    },
  );
};
