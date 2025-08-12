import { GatheringFilters, MyGatheringParams } from '@/entities/gathering/model/types';
import { ReviewFilterParams, ReviewScoreParams } from '@/entities/review/model/type';

// 객체로 쿼리 키 관리
export const QUERY_KEYS = {
  gathering: {
    // base로 관련 쿼리 한번에 무효화
    base: ['gatherings'] as const,
    list: (filters?: Omit<GatheringFilters, 'limit' | 'offset'>) =>
      [...QUERY_KEYS.gathering.base, 'list', filters] as const,
    infinite: (filters?: Omit<GatheringFilters, 'limit' | 'offset'>) =>
      [...QUERY_KEYS.gathering.base, 'infinite', filters] as const,
    detail: (id: number) => [...QUERY_KEYS.gathering.base, 'detail', id] as const,
    joined: (params?: MyGatheringParams) =>
      [...QUERY_KEYS.gathering.base, 'joined', params] as const,
    reviews: (gatheringId: number, params?: object) =>
      [...QUERY_KEYS.gathering.base, 'reviews', gatheringId, params] as const,
  },
  review: {
    base: ['reviews'] as const,
    list: (params: ReviewFilterParams) => [...QUERY_KEYS.review.base, 'list', params] as const,
    scores: (params: ReviewScoreParams) => [...QUERY_KEYS.review.base, 'score', params] as const,
  },
  participant: {
    base: ['participant'] as const,
    list: (gatheringId: number, filters?: object) =>
      [...QUERY_KEYS.participant.base, 'list', gatheringId, filters] as const,
  },
  favorites: {
    base: ['favorites'] as const,
    list: (filters: { type?: string; favoriteIds?: number[] }) =>
      [
        ...QUERY_KEYS.favorites.base,
        'list',
        { ...filters, favoriteIds: filters.favoriteIds?.join(',') },
      ] as const,
  },
  AUTH: {
    USER: {
      BASE: ['user'] as const,
    },
  },
} as const;
