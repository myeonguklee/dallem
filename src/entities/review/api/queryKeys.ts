import { ReviewFilterProps, ReviewScoreProps } from '../model/type';

// 단계별로, 쿼리 키 통합 관리
export const REVIEW_QUERY_KEYS = {
  review: {
    base: ['reviews'] as const,
    list: (params: ReviewFilterProps) =>
      [...REVIEW_QUERY_KEYS.review.base, 'list', params] as const,
    scores: (params: ReviewScoreProps) =>
      [...REVIEW_QUERY_KEYS.review.base, 'score', params] as const,
  },
} as const;
