/// <reference types="cypress" />

describe('Gathering Creation Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('로그인 후 모임 필드 작성 후 모임 생성 성공해야 한다', () => {
    cy.get('a').contains('로그인').click();

    // 로그인 페이지로 이동했는지 확인
    cy.url().should('include', '/signin');

    // 로그인 폼 작성 및 제출
    cy.get('input[type="text"]').type('test@example.com');
    cy.get('input[type="password"]').type('password');
    cy.get('button').contains('로그인').click();

    // 로그인 성공 후 모임 목록 페이지로 돌아갔는지 확인
    cy.url().should('include', '/gathering');

    // 모임 생성 버튼 클릭
    cy.get('button').contains('모임 만들기').click();

    // 모임 생성 폼 작성
    // 폼이 로드될 때까지 잠시 대기
    cy.wait(1000);

    cy.get('input[name="name"]').type('테스트 모임');

    // location은 커스텀 dropdown이므로 클릭으로 선택
    // DropdownTrigger 버튼 찾기 (실제 라벨은 "장소")
    cy.get('label').contains('장소').parent().find('button').click();
    // 옵션 선택
    cy.get('[role="option"]').contains('건대입구').click();

    // type은 BoxSelector이므로 클릭으로 선택 (워케이션 옵션 클릭)
    cy.get('label').contains('선택 서비스').parent().find('.bg-white').last().click();

    // dateTime은 커스텀 날짜 선택기이므로 클릭으로 선택 (실제 라벨은 "모임 날짜")
    // 더 구체적인 선택자 사용: cursor-pointer 클래스를 가진 div 찾기
    cy.get('label').contains('모임 날짜').parent().find('div.cursor-pointer').click();
    // 날짜 선택: 오늘부터 2일 후 선택 (동적 날짜 계산)
    const meetingDate = new Date();
    meetingDate.setDate(meetingDate.getDate() + 2);
    const meetingDay = meetingDate.getDate();
    cy.get('.fixed').find('[role="gridcell"]').contains(meetingDay.toString()).click();
    // 시간 설정 없이 바로 확인 버튼 클릭
    cy.get('.fixed').find('button').contains('확인').click();

    // registrationEnd도 커스텀 날짜 선택기 (실제 라벨은 "마감 날짜")
    // 더 구체적인 선택자 사용: cursor-pointer 클래스를 가진 div 찾기
    cy.get('label').contains('마감 날짜').parent().find('div.cursor-pointer').click();
    // 날짜 선택: 오늘부터 1일 후 선택 (동적 날짜 계산)
    const deadlineDate = new Date();
    deadlineDate.setDate(deadlineDate.getDate() + 1);
    const deadlineDay = deadlineDate.getDate();
    cy.get('.fixed').find('[role="gridcell"]').contains(deadlineDay.toString()).click();
    // 시간 설정 없이 바로 확인 버튼 클릭
    cy.get('.fixed').find('button').contains('확인').click();

    cy.get('input[name="capacity"]').type('10');

    // 모임 생성 버튼 클릭
    cy.get('button').contains('확인').click();

    // 모임 생성 성공 후 모임 목록 페이지로 돌아갔는지 확인
    cy.url().should('include', '/gathering');
  });
});
