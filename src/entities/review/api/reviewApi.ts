import { httpClient } from '@/shared/api';
import { API_ENDPOINTS } from '@/shared/config';
import {
  ReviewFilterProps,
  ReviewListResponse,
  ReviewScoreProps,
  ReviewScoreResponse,
} from '../model/type';

// 전체목록 조회
export const getReviewList = (params: ReviewFilterProps): Promise<ReviewListResponse> => {
  console.log('🔥 리뷰 요청:', params);
  return httpClient.get(`${API_ENDPOINTS.REVIEWS.LIST}`, { params });
};

//스토어 점수 조회
export const getReviewScore = (params: ReviewScoreProps = {}): Promise<ReviewScoreResponse> => {
  return httpClient.get(`${API_ENDPOINTS.REVIEWS.SCORES}`, { params });
};

//특정 모임 리뷰 조회
export const getGatheringReviewList = (
  gatheringId: number,
  params: Omit<ReviewFilterProps, 'gatheringId'> = {},
): Promise<ReviewListResponse> => {
  return httpClient.get(`${API_ENDPOINTS.REVIEWS.LIST}`, {
    params: { ...params, gatheringId },
  });
};
