import * as Sentry from '@sentry/nextjs';

const DSN = process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN;

Sentry.init({
  dsn: DSN,
  environment: process.env.NODE_ENV,

  tracesSampleRate: 1.0,
});
