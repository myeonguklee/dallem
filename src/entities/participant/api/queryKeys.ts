export const QUERY_KEYS = {
  participant: {
    base: ['participant'] as const,
    list: (gatheringId: number, filters?: object) =>
      [...QUERY_KEYS.participant.base, 'list', gatheringId, filters] as const,
  },
};
