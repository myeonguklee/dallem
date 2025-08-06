// 각 테스트 전에 실행되는 설정
beforeEach(() => {
  // localStorage와 쿠키 초기화
  cy.clearLocalStorage();
  cy.clearCookies();
});
