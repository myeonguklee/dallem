/// <reference types="cypress" />
// MSW 핸들러를 직접 import
import { setupWorker } from 'msw/browser';
import { cypressHandlers } from '../../src/shared/lib/msw/handlers';

// MSW 워커 설정
const worker = setupWorker(...cypressHandlers);

// Cypress 시작 시 MSW 워커 시작
before(async () => {
  if (typeof window !== 'undefined') {
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
    });
  }
});

// 테스트 후 정리
after(() => {
  if (typeof window !== 'undefined') {
    worker.stop();
  }
});

// 애플리케이션 에러 무시 (개발 환경 관련)
Cypress.on('uncaught:exception', (err) => {
  // 개발 환경에서 발생하는 일반적인 에러들을 무시
  if (
    err.message.includes('ResizeObserver') ||
    err.message.includes('Non-Error promise rejection') ||
    err.message.includes('ChunkLoadError') ||
    err.stack?.includes('_next/static/chunks')
  ) {
    return false;
  }
  return true;
});

// 각 테스트 전에 실행되는 설정
beforeEach(() => {
  cy.clearLocalStorage();
  cy.clearCookies();
});
