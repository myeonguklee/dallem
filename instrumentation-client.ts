import * as Sentry from '@sentry/nextjs';

const DSN = process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN;

Sentry.init({
  dsn: DSN,
  environment: process.env.NODE_ENV,
  sendDefaultPii: true,
  tracesSampleRate: 1.0,
});

// This export will instrument router navigations
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
