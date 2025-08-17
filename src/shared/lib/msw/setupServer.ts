// SSR 환경에서 MSW 서버 설정
import { server } from './server';

// 개발 환경에서 서버 사이드 MSW 시작
if (process.env.NODE_ENV === 'development' && typeof window === 'undefined') {
  server.listen({
    onUnhandledRequest: 'warn', // 처리되지 않은 요청을 경고로 표시
  });
}

// 프로세스 종료 시 정리
if (typeof process !== 'undefined') {
  process.on('SIGINT', () => {
    server.close();
  });

  process.on('SIGTERM', () => {
    server.close();
  });
}

export { server };
