// API 설정

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://fe-adv-project-together-dallaem.vercel.app',
  TEAM_ID: process.env.NEXT_PUBLIC_TEAM_ID || '1', // 기본 팀 ID
  TIMEOUT: 10000, // 10초
} as const;

export const API_ENDPOINTS = {
  // 인증
  AUTH: {
    SIGNUP: (teamId: string) => `/${teamId}/auths/signup`,
    SIGNIN: (teamId: string) => `/${teamId}/auths/signin`,
    SIGNOUT: (teamId: string) => `/${teamId}/auths/signout`,
    USER: (teamId: string) => `/${teamId}/auths/user`,
  },

  // 모임
  GATHERINGS: {
    LIST: (teamId: string) => `/${teamId}/gatherings`,
    DETAIL: (teamId: string, id: number) => `/${teamId}/gatherings/${id}`,
    CREATE: (teamId: string) => `/${teamId}/gatherings`,
    JOIN: (teamId: string, id: number) => `/${teamId}/gatherings/${id}/join`,
    LEAVE: (teamId: string, id: number) => `/${teamId}/gatherings/${id}/leave`,
    CANCEL: (teamId: string, id: number) => `/${teamId}/gatherings/${id}/cancel`,
    PARTICIPANTS: (teamId: string, id: number) => `/${teamId}/gatherings/${id}/participants`,
    JOINED: (teamId: string) => `/${teamId}/gatherings/joined`,
  },

  // 리뷰
  REVIEWS: {
    LIST: (teamId: string) => `/${teamId}/reviews`,
    CREATE: (teamId: string) => `/${teamId}/reviews`,
    SCORES: (teamId: string) => `/${teamId}/reviews/scores`,
  },
} as const;

// HTTP 상태 코드
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// 에러 코드
export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  EMAIL_EXISTS: 'EMAIL_EXISTS',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  GATHERING_CANCELED: 'GATHERING_CANCELED',
  GATHERING_FULL: 'GATHERING_FULL',
  REGISTRATION_CLOSED: 'REGISTRATION_CLOSED',
  ALREADY_JOINED: 'ALREADY_JOINED',
  PAST_GATHERING: 'PAST_GATHERING',
  NOT_PARTICIPANT: 'NOT_PARTICIPANT',
  SERVER_ERROR: 'SERVER_ERROR',
} as const;
