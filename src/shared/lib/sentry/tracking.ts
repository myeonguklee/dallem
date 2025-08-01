import * as Sentry from '@sentry/nextjs';

// API 성능 추적
export const trackApiPerformance = (
  endpoint: string,
  method: string,
  duration: number,
  status: number,
) => {
  Sentry.captureMessage('API 성능', {
    level: 'info',
    tags: {
      metricType: 'api_performance',
      endpoint,
      method,
      status: status.toString(),
    },
    extra: {
      duration,
      timestamp: new Date().toISOString(),
    },
  });
};

// 폼 검증 에러 추적
export const trackFormValidationError = (
  formName: string,
  errors: Record<string, unknown>,
  context?: Record<string, unknown>,
) => {
  Sentry.captureMessage(`폼 검증 에러: ${formName}`, {
    level: 'warning',
    tags: {
      errorType: 'form_validation',
      formName,
    },
    extra: {
      errors,
      context,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
    },
  });
};

// API 에러 추적
export const trackApiError = (
  error: Error,
  context?: {
    endpoint?: string;
    method?: string;
    status?: number;
    response?: unknown;
    request?: unknown;
  },
) => {
  const isServerError = context?.status && context.status >= 500;

  Sentry.captureException(error, {
    tags: {
      endpoint: context?.endpoint,
      method: context?.method,
      status: context?.status?.toString(),
      errorType: isServerError ? 'server_error' : 'client_error',
    },
    extra: {
      response: context?.response,
      request: context?.request,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
    },
    level: isServerError ? 'error' : 'warning',
  });
};
