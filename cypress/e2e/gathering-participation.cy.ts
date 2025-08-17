/// <reference types="cypress" />

describe('Gathering Participation Flow', () => {
  beforeEach(() => {
    cy.visit('/gathering');
  });

  it('비로그인시 로그인 안내 팝업이 표시되어야 한다', () => {
    // 첫 번째 모임 카드 클릭하여 상세 페이지로 이동
    cy.get('a[href*="/gathering/"]').should('exist');
    cy.get('a[href*="/gathering/"]').first().click();

    // 모임 상세 페이지로 이동했는지 확인
    cy.url().should('include', '/gathering/');

    // 참여하기 버튼 클릭 (비로그인 상태)
    cy.get('button').contains('참여하기').click();

    // 로그인 필요 팝업이 표시되는지 확인
    cy.contains('로그인이 필요한 서비스 입니다.').should('exist');
  });

  it('로그인 후 모임 참여 및 취소가 성공해야 한다', () => {
    // 첫 번째 모임 카드 클릭하여 상세 페이지로 이동
    cy.get('a[href*="/gathering/"]').should('exist');
    cy.get('a[href*="/gathering/"]').first().click();

    // 모임 상세 페이지로 이동했는지 확인
    cy.url().should('include', '/gathering/');

    // 참여하기 버튼 클릭 (비로그인 상태)
    cy.get('button').contains('참여하기').click();

    // 로그인 팝업에서 로그인 버튼 클릭
    cy.get('button').contains('로그인').click();

    // 로그인 페이지로 이동했는지 확인
    cy.url().should('include', '/signin');

    // 로그인 폼 작성 및 제출
    cy.get('input[type="text"]').type('test@example.com');
    cy.get('input[type="password"]').type('password');
    cy.get('button').contains('로그인').click();

    // 로그인 성공 후 모임 목록 페이지로 돌아갔는지 확인
    cy.url().should('include', '/gathering');

    // 다시 첫 번째 모임 카드 클릭하여 상세 페이지로 이동
    cy.get('a[href*="/gathering/"]').should('exist');
    cy.get('a[href*="/gathering/"]').first().click();

    // 이제 로그인된 상태이므로 참여하기 버튼 클릭
    cy.get('button').contains('참여하기').click();

    // 버튼이 참여 취소로 변경되었는지 확인
    cy.get('button').contains('참여 취소').should('exist');

    cy.wait(1000);

    // 참여 취소 버튼 클릭
    cy.get('button').contains('참여 취소').click();

    cy.get('button').contains('참여하기').should('exist');
  });
});
