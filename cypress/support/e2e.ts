/// <reference types="cypress" />
import { setupWorker } from 'msw/browser';
import { cypressHandlers } from '../../src/shared/lib/msw/handlers/index';

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
    console.log('MSW worker started for Cypress tests');
  }
});

// 테스트 후 정리
after(() => {
  if (typeof window !== 'undefined') {
    worker.stop();
    console.log('MSW worker stopped');
  }
});

// 애플리케이션 에러 무시 (MSW 모킹 관련 에러)
Cypress.on('uncaught:exception', (err) => {
  // 테스트 환경에서 발생하는 일반적인 에러들을 무시
  if (
    err.message.includes('fetch') ||
    err.message.includes('Network') ||
    err.message.includes('API') ||
    err.message.includes('query') ||
    err.message.includes('ResizeObserver') ||
    err.message.includes('Non-Error promise rejection') ||
    err.message.includes('ChunkLoadError') ||
    err.message.includes('Loading chunk') ||
    err.message.includes('Loading CSS chunk') ||
    err.stack?.includes('_next/static/chunks') ||
    err.name === 'ChunkLoadError'
  ) {
    return false;
  }
  // 그 외의 실제 테스트 관련 에러는 유지
  return true;
});

// Cypress 명령어 확장
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      startMSW(): Chainable<void>;
      stopMSW(): Chainable<void>;
    }
  }
}

// MSW 시작 명령어
Cypress.Commands.add('startMSW', () => {
  cy.window().then(async (win) => {
    // 브라우저 환경에서 MSW 워커 시작
    if (typeof win.navigator !== 'undefined' && 'serviceWorker' in win.navigator) {
      await worker.start({
        onUnhandledRequest: 'warn',
        serviceWorker: {
          url: '/mockServiceWorker.js',
        },
      });
    }
  });
});

// MSW 중지 명령어
Cypress.Commands.add('stopMSW', () => {
  cy.window().then(async () => {
    await worker.stop();
  });
});

// 각 테스트 전에 실행되는 설정
beforeEach(() => {
  // localStorage와 쿠키 초기화
  cy.clearLocalStorage();
  cy.clearCookies();

  // MSW 시작
  cy.startMSW();
});
