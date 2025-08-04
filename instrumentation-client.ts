import * as Sentry from '@sentry/nextjs';

const DSN = process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN;

Sentry.init({
  dsn: DSN,
  environment: process.env.NODE_ENV,
  sendDefaultPii: true,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // 프로덕션 환경에서만 에러 추적 활성화
  enabled: process.env.NODE_ENV === 'production',

  // 개발 환경에서는 에러 전송 비활성화
  beforeSend(event) {
    if (process.env.NODE_ENV !== 'production') {
      return null;
    }
    return event;
  },
});

// This export will instrument router navigations
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
