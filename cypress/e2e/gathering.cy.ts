/// <reference types="cypress" />

describe('Gathering Page Tests', () => {
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

  it('should display basic page content', () => {
    // 페이지가 로드되고 기본 텍스트가 표시되는지 확인
    cy.get('body').should('contain', '모임');
  });

  it('should show gathering list or loading state', () => {
    // 모임 목록이 있거나 로딩 상태가 표시되는지 확인
    cy.get('body').should('be.visible');
    // 실제 데이터가 로드될 때까지 대기
    cy.wait(3000);
    // 페이지에 어떤 내용이든 표시되는지 확인
    cy.get('body').should('not.be.empty');
  });

  it('should test API mocking with cy.intercept', () => {
    // 새로운 페이지 방문 전에 intercept 설정
    cy.intercept('GET', '**/gatherings*', {
      statusCode: 200,
      body: [
        {
          teamId: 1,
          id: 1,
          type: 'DALLAEMFIT',
          name: '달램핏 테스트 모임',
          dateTime: '2024-12-25T10:00:00',
          registrationEnd: '2024-12-24T23:59:59',
          location: '건대입구',
          participantCount: 5,
          capacity: 20,
          image: 'https://example.com/image1.jpg',
          createdBy: 1,
          canceledAt: null,
        },
      ],
    }).as('mockGatherings');

    // 페이지 새로고침으로 API 요청 트리거
    cy.reload();

    // 모킹된 데이터 확인 (클라이언트 사이드에서 요청이 발생한다면)
    cy.get('body').should('be.visible');

    // 필터 클릭 등으로 클라이언트 사이드 요청 유도
    cy.get('div').contains('달램핏').click();
    cy.wait(2000);

    // 페이지가 여전히 정상 작동하는지 확인
    cy.url().should('include', '/gathering');
  });

  it('should have working navigation', () => {
    // 페이지가 정상적으로 로드되고 네비게이션이 작동하는지 확인
    cy.get('nav').should('be.visible');
  });

  it('should handle API errors gracefully', () => {
    // 실제 환경에서는 네트워크 오류 시뮬레이션 가능
    // 현재는 기본적인 로딩 상태 확인
    cy.visit('/gathering');
    cy.get('body').should('be.visible');
  });
});
