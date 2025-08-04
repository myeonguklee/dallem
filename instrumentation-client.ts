import * as Sentry from '@sentry/nextjs';

const DSN = process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN;

export function register() {
  Sentry.init({
    dsn: DSN,
    environment: process.env.NODE_ENV,

    // 성능 최적화 설정
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

    // 개발 환경에서는 더 자세한 로깅
    debug: false,

    // 사용자 정보 설정
    beforeSend(event) {
      // 개발 환경에서는 Sentry로 전송하지 않음
      if (process.env.NODE_ENV === 'development') {
        return null;
      }
      return event;
    },

    // 사용자 정보 설정
    beforeSendTransaction(event) {
      return event;
    },
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
