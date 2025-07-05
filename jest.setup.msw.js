// Jest 환경에서 MSW 설정 (polyfill 정의 후)
import { server } from './src/shared/lib/msw/server';

// MSW 서버 시작
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// 각 테스트 후 핸들러 초기화
afterEach(() => server.resetHandlers());

// 모든 테스트 후 서버 종료
afterAll(() => server.close());
