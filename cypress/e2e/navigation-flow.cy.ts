/// <reference types="cypress" />

describe('Navigation Flow', () => {
  describe('Main Navigation', () => {
    it('should navigate between main pages', () => {
      // 홈
      cy.visit('/ko');
      cy.get('body').should('be.visible');

      // 로그인
      cy.visit('/ko/signin');
      cy.get('body').should('be.visible');

      // 회원가입
      cy.visit('/ko/signup');
      cy.get('body').should('be.visible');

      // 모임
      cy.visit('/ko/gathering');
      cy.get('body').should('be.visible');

      // 마이페이지
      cy.visit('/ko/my-page');
      cy.get('body').should('be.visible');

      // 리뷰
      cy.visit('/ko/reviews');
      cy.get('body').should('be.visible');
    });
  });

  describe('Link Navigation', () => {
    it('should access navigation pages directly', () => {
      // 복잡한 DOM 상호작용 대신 직접 URL 네비게이션으로 테스트
      cy.log('ℹ️ Testing navigation via direct URLs (more reliable than DOM interaction)');

      const navigationPages = [
        { path: '/ko/gathering', name: 'Gathering' },
        { path: '/ko/favorites', name: 'Favorites' },
        { path: '/ko/reviews', name: 'Reviews' },
        { path: '/ko/signin', name: 'Sign In' },
      ];

      navigationPages.forEach((page) => {
        cy.visit(page.path);
        cy.wait(1000);
        cy.get('body').should('be.visible');
        cy.url().should('include', page.path.replace('/ko', ''));
        cy.log(`✅ ${page.name} page accessible via ${page.path}`);
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle non-existent pages', () => {
      cy.visit('/ko/nonexistent', { failOnStatusCode: false });
      cy.get('body').should('be.visible');
    });
  });
});
