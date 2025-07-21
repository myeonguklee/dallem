//리뷰 리스트 요청 props
export interface ReviewFilterProps {
  type?: string;
  location?: string;
  date?: string;
  sortBy?: string;
  sortOrder?: string;
  limit?: number | string;
  offset?: number | string;
}

// 리뷰 평점 요청 props
export interface ReviewScoreProps {
  type?: string;
}

//응답 props

export interface ReviewListItem {
  teamId: string;
  id: number;
  score: number;
  comment: string;
  createdAt: string;
  Gathering: {
    teamId: number;
    id: number;
    type: string;
    name: string;
    dateTime: string;
    location: string;
    image: string;
  };
  User: {
    teamId: number;
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
  type: 'DALLAEMFIT' | 'WORKATION' | 'MINDFULNESS' | string; // 필요한 타입들 추가
  averageScore: number;
  oneStar: number;
  twoStars: number;
  threeStars: number;
  fourStars: number;
  fiveStars: number;
}

export type ReviewScoreResponse = ReviewScoreItem[];
