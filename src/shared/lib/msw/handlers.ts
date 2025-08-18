// MSW 핸들러와 Mock 데이터의 중앙 집중 관리
import { authHandlers } from './handlers/auth';
import { gatheringHandlers, mockGatherings } from './handlers/gathering';
import { mockReviews, reviewHandlers } from './handlers/review';

// 모든 핸들러를 통합 (DRY 원칙)
export const handlers = [...authHandlers, ...gatheringHandlers, ...reviewHandlers];

// 도메인별 핸들러 개별 export (필요시 개별 사용 가능)
export { authHandlers, gatheringHandlers, reviewHandlers };

// Mock 데이터 export (테스트에서 직접 사용)
export { mockGatherings, mockReviews };

// 환경별 핸들러 조합 (명시적 의도 표현)
export const developmentHandlers = handlers;
export const testHandlers = handlers;
export const cypressHandlers = handlers;
