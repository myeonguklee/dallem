export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // 개발 환경에서만 SSR을 위한 MSW를 실행합니다.
    if (process.env.NODE_ENV === 'development') {
      await import('@/shared/lib/msw/setupServer');
    }
    await import('./sentry.server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}
