/// <reference types="cypress" />

describe('Authentication Flow', () => {
  describe('Sign In', () => {
    it('should complete signin flow', () => {
      cy.visit('/ko/signin');

      // 폼 입력
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('password123');

      // 제출
      cy.get('button[type="submit"]').click();

      // 결과 확인 (로그인 성공 시 다른 페이지로 이동하거나 메시지 표시)
      cy.wait(2000);
      cy.url().then((url) => {
        cy.log('After signin URL:', url);
      });
    });

    it('should navigate to signup from signin', () => {
      cy.visit('/ko/signin');
      cy.get('a').contains('회원가입').click();
      cy.url().should('include', '/signup');
    });
  });

  describe('Sign Up', () => {
    it('should complete signup flow', () => {
      cy.visit('/ko/signup');

      // 폼 입력
      cy.get('input[name="name"]').type('테스트 사용자');
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="company"]').type('테스트 회사');
      cy.get('input[name="password"]').type('password123');
      cy.get('input[name="confirmPassword"]').type('password123');

      // 제출
      cy.get('button[type="submit"]').click();

      // 결과 확인
      cy.wait(2000);
      cy.url().then((url) => {
        cy.log('After signup URL:', url);
      });
    });

    it('should navigate to signin from signup', () => {
      cy.visit('/ko/signup');
      cy.get('a').contains('로그인').click();
      cy.wait(1000);
      cy.url().should('include', '/signin');
    });
  });
});
