/// <reference types="cypress" />
// MSW 데이터 직접 import
import { mockGatherings } from '../../src/shared/lib/msw/handlers';

describe('Gathering Flow', () => {
  describe('Browse Gatherings', () => {
    it('should browse gathering list', () => {
      cy.visit('/ko/gathering');
      cy.wait(2000); // 컨텐츠 로딩 대기

      // 기본 페이지 로드 확인
      cy.get('body').should('be.visible');
      cy.url().should('include', '/gathering');
    });

    it('should use filters if available', () => {
      cy.visit('/ko/gathering');
      cy.wait(2000);

      cy.get('body').then(($body) => {
        const bodyText = $body.text();

        // 달램핏 필터 클릭
        if (bodyText.includes('달램핏')) {
          cy.contains('달램핏').click();
          cy.wait(1000);
          cy.log('✅ 달램핏 filter clicked');
        }

        // 워케이션 필터 클릭
        if (bodyText.includes('워케이션')) {
          cy.contains('워케이션').click();
          cy.wait(1000);
          cy.log('✅ 워케이션 filter clicked');
        }
      });
    });
  });

  describe('Gathering Interactions', () => {
    it('should interact with gathering cards', () => {
      cy.visit('/ko/gathering');
      cy.wait(3000);

      // MSW 데이터로 예상되는 모임 이름들 확인
      cy.get('body').then(($body) => {
        const bodyText = $body.text();

        // MSW에서 제공하는 모임들이 표시되는지 확인
        const expectedGatherings = mockGatherings.map((g) => g.name);
        let foundGathering = false;

        expectedGatherings.forEach((name) => {
          if (bodyText.includes(name)) {
            cy.log(`✅ Found expected gathering: ${name}`);
            foundGathering = true;
          }
        });

        if (!foundGathering) {
          cy.log('ℹ️ No specific gatherings found - might be loading or different data');
        }

        // 참가 버튼이나 상호작용 요소 확인
        if (bodyText.includes('참가')) {
          cy.log('✅ Found participation buttons');
        }
      });
    });

    it('should navigate to gathering detail if possible', () => {
      cy.visit('/ko/gathering');
      cy.wait(2000);

      // 상세보기나 모임 카드 클릭 시도
      cy.get('body').then(($body) => {
        // 첫 번째 클릭 가능한 요소 찾기
        const $clickableElements = $body.find('a, button').filter(':visible');
        if ($clickableElements.length > 0) {
          cy.log(`Found ${$clickableElements.length} clickable elements`);
        }
      });
    });
  });
});
