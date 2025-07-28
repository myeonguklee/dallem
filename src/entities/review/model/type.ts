// enums

export type ReviewType = 'DALLAEMFIT' | 'OFFICE_STRETCHING' | 'MINDFULNESS' | 'WORKATION';
export type ReviewLocation = '건대입구' | '을지로3가' | '신림' | '홍대입구';
export type ReviewSortBy = 'createdAt' | 'score' | 'participantCount';
export type SortOrder = 'asc' | 'desc';

//리뷰 리스트 요청 props
export interface ReviewFilterProps {
  type?: ReviewType;
  location?: ReviewLocation;
  date?: string;
  sortBy?: ReviewSortBy;
  sortOrder?: SortOrder;
  limit?: number;
  offset?: number;
}

// 리뷰 평점 요청 props
export interface ReviewScoreProps {
  type?: ReviewType;
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
    type: ReviewType;
    name: string;
    dateTime: string;
    location: ReviewLocation;
    image: string;
  };
  User: {
    teamId: string;
    id: number;
    name: string;
    image: string;
  };
}

export interface ReviewListResponse {
  data: ReviewListItem[];
  totalItemCount: number;
  currentPage: number;
  totalPages: number;
}

export interface ReviewScoreItem {
  teamId: string;
  type: ReviewType;
  averageScore: number;
  oneStar: number;
  twoStars: number;
  threeStars: number;
  fourStars: number;
  fiveStars: number;
}

export type ReviewScoreResponse = ReviewScoreItem[];
