import { authHandlers } from './auth';
import { gatheringHandlers } from './gathering';
import { reviewHandlers } from './review';

// 모든 핸들러를 통합
export const handlers = [...authHandlers, ...gatheringHandlers, ...reviewHandlers];

// 도메인별 핸들러도 개별 export
export { authHandlers } from './auth';
export { gatheringHandlers, mockGatherings } from './gathering';
export { reviewHandlers, mockReviews } from './review';

// 환경별 핸들러 조합
export const developmentHandlers = handlers;
export const testHandlers = handlers;
export const cypressHandlers = handlers;
