import axios, { AxiosError, AxiosResponse } from 'axios';
import { ApiError } from './apiError';

// 팀 아이디 : 실제 배포시에는 환경변수로 관리
const TEST_TEAM_ID = '10-666';

export const axiosInstance = axios.create({
  // baseURL: `https://fe-adv-project-together-dallaem.vercel.app/${process.env.NEXT_PUBLIC_TEAM_ID}`,
  baseURL: `https://fe-adv-project-together-dallaem.vercel.app/${TEST_TEAM_ID}`,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
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
