import type { CreateReviewPayload } from '@/entities/review/model/schema';
import type {
  CreateReviewResponse,
  ReviewFilterParams,
  ReviewListResponse,
  ReviewScoreParams,
  ReviewScoreResponse,
} from '@/entities/review/model/type';
import { httpClient } from '@/shared/api';
import { API_ENDPOINTS } from '@/shared/config';

// 리뷰 조회
export const getReviewList = (params: ReviewFilterParams): Promise<ReviewListResponse> => {
  return httpClient.get(`${API_ENDPOINTS.REVIEWS.LIST}`, { params });
};

// 리뷰 점수 조회
export const getReviewScore = (params: ReviewScoreParams = {}): Promise<ReviewScoreResponse> => {
  return httpClient.get(`${API_ENDPOINTS.REVIEWS.SCORES}`, { params });
};

//특정 모임 리뷰 조회
export const getGatheringReviewList = (
  gatheringId: number,
  params: Omit<ReviewFilterParams, 'gatheringId'> = {},
): Promise<ReviewListResponse> => {
  return httpClient.get(`${API_ENDPOINTS.REVIEWS.LIST}`, {
    params: { ...params, gatheringId },
  });
};

// 리뷰 생성
export const createReview = (payload: CreateReviewPayload): Promise<CreateReviewResponse> => {
  return httpClient.post(`${API_ENDPOINTS.REVIEWS.CREATE}`, payload, {
    authRequired: true,
  });
};
