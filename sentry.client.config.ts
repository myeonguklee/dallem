import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,

  // 성능 최적화 설정
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // 개발 환경에서는 더 자세한 로깅
  debug: process.env.NODE_ENV === 'development',

  // 에러 필터링 (개발 환경에서도 전송하도록 변경)
  beforeSend(event) {
    // 개발 환경에서도 Sentry로 전송 (테스트용)
    if (process.env.NODE_ENV === 'development') {
      console.log('Sentry event (development):', event);
      // return null; // 이 줄을 주석처리하여 개발 환경에서도 전송
    }
    return event;
  },
});
