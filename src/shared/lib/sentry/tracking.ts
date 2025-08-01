import * as Sentry from '@sentry/nextjs';

/**
 * API 성능 추적
 */
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

/**
 * 리뷰 관련 에러 추적
 */
export const trackReviewError = (
  action: 'create' | 'update' | 'delete',
  error: Error,
  context?: {
    gatheringId?: string;
    reviewId?: string;
    rating?: number;
  },
) => {
  Sentry.captureException(error, {
    tags: {
      errorType: 'business_logic',
      domain: 'review',
      action,
    },
    extra: {
      context,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
    },
  });
};

/**
 * 리뷰 성공 추적
 */
export const trackReviewSuccess = (
  action: 'create' | 'update' | 'delete',
  context?: {
    gatheringId?: string;
    reviewId?: string;
    rating?: number;
  },
) => {
  Sentry.captureMessage(`리뷰 ${action} 성공`, {
    level: 'info',
    tags: {
      actionType: 'business_success',
      domain: 'review',
      action,
    },
    extra: {
      context,
      timestamp: new Date().toISOString(),
    },
  });
};

/**
 * 모임 참여/탈퇴 에러 추적
 */
export const trackGatheringParticipationError = (
  action: 'join' | 'leave',
  error: Error,
  context?: {
    gatheringId?: string;
    gatheringTitle?: string;
  },
) => {
  Sentry.captureException(error, {
    tags: {
      errorType: 'business_logic',
      domain: 'gathering_participation',
      action,
    },
    extra: {
      context,
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
    },
  });
};

/**
 * API 에러 추적
 */
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
