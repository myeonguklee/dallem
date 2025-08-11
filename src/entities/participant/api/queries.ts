import { QUERY_KEYS } from '@/shared/api';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Participant } from '../model/types';
import { GetParticipantsOptions, getParticipants } from './services';

export const useGetParticipants = (gatheringId: number, options?: GetParticipantsOptions) => {
  return useSuspenseQuery<Participant[]>({
    queryKey: QUERY_KEYS.participant.list(gatheringId, options),
    queryFn: () => getParticipants(gatheringId, options ?? {}),
    staleTime: 1000 * 60 * 2,
  });
};
