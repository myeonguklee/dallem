import { API_CONFIG } from '@/shared/config';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiError } from './apiError';
import { logError, logRequest, logResponse } from './logger';

// 팀 아이디 : 실제 배포시에는 환경변수로 관리
const TEST_TEAM_ID = '10-666';

const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL(TEST_TEAM_ID),
  timeout: API_CONFIG.TIMEOUT,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use((config) => {
  // TODO: Next Auth 세션 관리 적용 후 수정
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  // FormData 자동 변환
  if (config.headers['Content-Type'] === 'multipart/form-data') {
    const formData = new FormData();

    Object.entries(config.data || {}).forEach(([key, value]) => {
      if (value == null) return;
      formData.append(key, value instanceof File ? value : String(value));
    });

    config.data = formData;
  }

  logRequest(config);
  return config;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    logResponse(response);
    return response;
  },
  (error: AxiosError) => {
    logError(error);

    if (!error.response) {
      console.error('Network Error:', error);
      // 네트워크 에러는 예측 불가능하므로, 일반적인 에러 객체로 반환
      return Promise.reject(new Error('네트워크 연결 상태를 확인해주세요.'));
    }
    const { status, data } = error.response;
    const { code, message } = data as { code: string; message: string };

    if (status === 401) {
      // 토큰 만료 시 재발급 로직
      // 재발급 실패 시 로그아웃 처리 + 로그인 페이지로 리디렉션
      console.error('401 Unauthorized:', message);
      localStorage.removeItem('accessToken');
      window.location.href = '/signin';

      return Promise.reject(
        new ApiError(message || '인증이 필요합니다.', code || 'UNAUTHORIZED', status),
      );
    }
    // Sentry 도입시 500대 에러 등 심각한 에러 처리
    if (status >= 500) {
      // Sentry.captureException(error);
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
