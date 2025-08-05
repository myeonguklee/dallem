describe('Gathering Page', () => {
  beforeEach(() => {
    // 각 테스트 전에 gathering 페이지로 이동
    cy.visit('/gathering');
  });

  it('should load the gathering page successfully', () => {
    // 페이지가 성공적으로 로드되는지 확인
    cy.url().should('include', '/gathering');

    // 페이지 제목이 표시되는지 확인 (h1 대신 p 태그 사용)
    cy.get('p').contains('모임').should('be.visible');
  });

  it('should display the header section with icon and title', () => {
    // 헤더 섹션이 존재하는지 확인 (더 구체적인 선택자 사용)
    cy.get('p').contains('모임').should('be.visible');

    // SVG 아이콘이 존재하는지 확인
    cy.get('svg').should('exist');
  });

  it('should display the create gathering button', () => {
    // 모임 생성 버튼이 표시되는지 확인
    cy.get('button').contains('모임 만들기').should('be.visible');
  });

  it('should display the filter section', () => {
    // 필터 섹션이 표시되는지 확인 (클래스명이나 텍스트로 선택)
    cy.get('div').contains('달램핏').should('be.visible');
    cy.get('div').contains('워케이션').should('be.visible');
  });

  it('should display the gathering list', () => {
    // 모임 목록이 표시되는지 확인 (더 구체적인 선택자 사용)
    cy.get('div').should('contain', '모임');
  });

  it('should have working navigation', () => {
    // 페이지가 정상적으로 로드되고 네비게이션이 작동하는지 확인
    cy.get('nav').should('be.visible');
  });
});
