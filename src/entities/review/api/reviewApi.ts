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
  return httpClient.get(`${API_ENDPOINTS.REVIEWS.LIST}`, { params });
};

//스토어 점수 조회
export const getReviewScore = (params: ReviewScoreProps = {}): Promise<ReviewScoreResponse> => {
  return httpClient.get(`${API_ENDPOINTS.REVIEWS.SCORES}`, { params });
};
