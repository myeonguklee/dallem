// Jest 테스트 환경용 MSW 설정
import { server } from './server';

// 테스트 시작 전 MSW 서버 시작
beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'error', // 테스트에서는 처리되지 않은 요청을 에러로 처리
  });
});

// 각 테스트 후 핸들러 리셋
afterEach(() => {
  server.resetHandlers();
});

// 모든 테스트 완료 후 서버 종료
afterAll(() => {
  server.close();
});
