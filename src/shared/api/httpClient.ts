// import { getToken } from 'next-auth/jwt';
import { getSession, signOut } from 'next-auth/react';
// import { cookies } from 'next/headers';
import { API_CONFIG } from '@/shared/config';
import { trackApiError, trackApiPerformance } from '@/shared/lib/sentry/tracking';
import axios, { AxiosError, AxiosHeaders, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiError } from './apiError';
import { logError, logRequest, logResponse } from './logger';

declare module 'axios' {
  interface AxiosRequestConfig {
    authRequired?: boolean;
    metadata?: {
      startTime: Date;
    };
  }
}

const IS_CLIENT = typeof window !== 'undefined';

const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL(),
  timeout: API_CONFIG.TIMEOUT,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use(async (config) => {
  config.metadata = { startTime: new Date() };

  if (config.authRequired) {
    let token;
    const headers = AxiosHeaders.from(config.headers);

    if (IS_CLIENT) {
      const session = await getSession();
      const accessToken = session?.user?.accessToken;
      token = accessToken;
    } else {
      // const rawToken = await getToken({
      //   req: { headers: headers } as NextApiRequest,
      //   secret: process.env.NEXTAUTH_SECRET,
      //   raw: true, // 원본 JWT 문자열
      // });
      // token = rawToken;
    }
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
      config.headers = headers;
    }
  }

  // FormData 자동 변환
  if (config.headers['Content-Type'] === 'multipart/form-data') {
    const formData = new FormData();

    Object.entries(config.data || {}).forEach(([key, value]) => {
      if (value == null) return;

      // Date 객체를 ISO 형식으로 변환
      if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else if (value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    });

    config.data = formData;
  }

  logRequest(config);
  return config;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    logResponse(response);

    // API 성능 추적
    const startTime = response.config.metadata?.startTime;
    if (startTime) {
      const duration = Date.now() - startTime.getTime();
      trackApiPerformance(
        response.config.url || '',
        response.config.method || '',
        duration,
        response.status,
      );
    }

    return response;
  },
  (error: AxiosError) => {
    logError(error);

    if (!error.response) {
      console.error('Network Error:', error);
      // 네트워크 에러는 일반 Error로 처리
      return Promise.reject(new Error('네트워크 연결 상태를 확인해주세요.'));
    }

    // Axios 타임아웃 일반 Error로 처리
    if (error.code === 'ECONNABORTED') {
      console.error('Timeout Error:', error);
      return Promise.reject(new Error('요청 시간이 초과되었습니다.'));
    }
    const { status, data } = error.response;
    const { code, message } = (data as { code?: string; message?: string }) || {};
    const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
    const isAuthPage = pathname.includes('/signin') || pathname.includes('/signup');
    if (status === 401 && !isAuthPage) {
      // 인증 실패 시 로그아웃 처리 후 로그인 페이지로 이동
      if (IS_CLIENT) {
        console.error('401 Unauthorized:', message);

        // 현재 locale을 가져와서 리다이렉트
        const currentPath = window.location.pathname;
        const localeMatch = currentPath.match(/^\/([a-z]{2})(\/|$)/);
        const currentLocale = localeMatch ? localeMatch[1] : 'ko';
        signOut({ redirect: false }).then(() => {
          window.location.href = `/${currentLocale}/signin`;
        });
      }
      // global-error 를 안태우기 위해 resolve 반환
      return Promise.resolve(undefined);
    }
    // Sentry로 HTTP 에러 추적
    // - 500+ 에러: 모든 환경에서 추적 (서버 에러)
    // - 400+ 에러: 프로덕션에서만 추적 (클라이언트 에러)
    const isServerError = status >= 500;
    const isClientError = status >= 400 && status < 500;
    const shouldTrackError =
      isServerError || (process.env.NODE_ENV === 'production' && isClientError);

    if (shouldTrackError) {
      trackApiError(error, {
        endpoint: error.config?.url,
        method: error.config?.method,
        status,
        response: data,
        request: error.config,
      });
    }

    // 그 외 에러는 ApiError로 래핑하여 반환
    return Promise.reject(
      new ApiError(message || '알 수 없는 오류가 발생했습니다.', code || 'UNKNOWN_ERROR', status),
    );
  },
);

export const httpClient = {
  get: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.get<T>(url, config).then((response) => response.data),

  post: <T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<T> => axiosInstance.post<T>(url, data, config).then((response) => response.data),

  put: <T = unknown, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.put<T>(url, data, config).then((response) => response.data),

  delete: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    axiosInstance.delete<T>(url, config).then((response) => response.data),
};
