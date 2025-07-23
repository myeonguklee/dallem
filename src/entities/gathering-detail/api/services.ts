import { httpClient } from '@/shared/api';
import { API_ENDPOINTS } from '@/shared/config/api';
import { GatheringDetail } from '../model/types';

export const getGatheringById = async (id: number): Promise<GatheringDetail> => {
  return await httpClient.get<GatheringDetail>(API_ENDPOINTS.GATHERINGS.DETAIL(id));
};
