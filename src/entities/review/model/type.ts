import type { GatheringLocation, GatheringType } from '@/entities/gathering/model/types';
import type { User } from '@/entities/user/model';

// enums
export type ReviewSortBy = 'createdAt' | 'score' | 'participantCount';
export type SortOrder = 'asc' | 'desc';

//리뷰 리스트 요청 파라미터
export interface ReviewFilterParams {
  type?: GatheringType;
  location?: GatheringLocation;
  date?: string;
  sortBy?: ReviewSortBy;
  sortOrder?: SortOrder;
  limit?: number;
  offset?: number;
  gatheringId?: number;
  userId?: number;
}

// 리뷰 평점 요청 파라미터
export interface ReviewScoreParams {
  type?: GatheringType;
}

//응답 props
export interface ReviewListItem {
  teamId: string;
  id: number;
  score: number;
  comment: string;
  createdAt: string;
  Gathering: {
    teamId: string;
    id: number;
    type: GatheringType;
    name: string;
    dateTime: string;
    location: GatheringLocation;
    image: string;
  };
  User: Pick<User, 'teamId' | 'id' | 'name' | 'image'>;
}

export interface ReviewListResponse {
  data: ReviewListItem[];
  totalItemCount: number;
  currentPage: number;
  totalPages: number;
}

export interface ReviewScoreItem {
  teamId: string;
  type: GatheringType;
  averageScore: number;
  oneStar: number;
  twoStars: number;
  threeStars: number;
  fourStars: number;
  fiveStars: number;
}

export type ReviewScoreResponse = ReviewScoreItem[];

export interface CreateReviewResponse {
  teamId: string;
  id: number;
  userId: number;
  gatheringId: number;
  score: number;
  comment: string;
  createdAt: string;
}
