import { useQuery } from '@tanstack/react-query';
import { Participant } from '../model/types';
import { QUERY_KEYS } from './queryKeys';
import { GetParticipantsOptions, getParticipants } from './services';

export const useGetParticipants = (gatheringId: number, options?: GetParticipantsOptions) => {
  return useQuery<Participant[]>({
    queryKey: QUERY_KEYS.participant.list(gatheringId, options),
    queryFn: () => getParticipants(gatheringId, options ?? {}),
    enabled: !!gatheringId,
    staleTime: 1000 * 60 * 2,
  });
};
