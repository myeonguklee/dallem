import { httpClient } from '@/shared/api';
import { API_ENDPOINTS } from '@/shared/config';
import { Participant } from '../model/types';

export interface GetParticipantsOptions {
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export const getParticipants = async (
  gatheringId: number,
  options: GetParticipantsOptions = {},
): Promise<Participant[]> => {
  const params: Record<string, string> = {};
  if (options.limit !== undefined) params.limit = String(options.limit);
  if (options.offset !== undefined) params.offset = String(options.offset);
  if (options.sortBy) params.sortBy = options.sortBy;
  if (options.sortOrder) params.sortOrder = options.sortOrder;

  return await httpClient.get(API_ENDPOINTS.GATHERINGS.PARTICIPANTS(gatheringId), {
    params: Object.keys(params).length ? params : undefined,
  });
};
