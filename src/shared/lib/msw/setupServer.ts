// SSR 환경에서 MSW 서버 설정
import { server } from './server';

// 개발 환경에서 서버 사이드 MSW 시작
if (process.env.NODE_ENV === 'development' && typeof window === 'undefined') {
  server.listen({
    onUnhandledRequest: 'bypass', // 처리되지 않은 요청은 실제 API로 전달
  });

  console.log('🔶 MSW Server started for SSR development');
  console.log('💡 실제 API 사용하려면 이 파일을 주석 처리하세요');
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
