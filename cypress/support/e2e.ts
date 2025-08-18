/// <reference types="cypress" />

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
