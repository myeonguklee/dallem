/// <reference types="cypress" />
// 전역 MSW 핸들러 사용
export { cypressHandlers } from '../../src/shared/lib/msw/handlers/index';

// 기존 코드는 전역 핸들러로 이동됨
// cypress/support/handlers.ts는 이제 단순히 전역 핸들러를 재export
