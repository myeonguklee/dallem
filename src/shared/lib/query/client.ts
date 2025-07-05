import { QueryClient } from '@tanstack/react-query';

// React Query 클라이언트 설정
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // React Query 기본 설정 (SSR/CSR 공통)
      staleTime: 1000 * 60 * 5, // 5분 (데이터가 fresh한 시간)
      gcTime: 1000 * 60 * 10, // 10분 (캐시 유지 시간, 이전 cacheTime)
      retry: 1, // 실패 시 재시도 횟수
      refetchOnWindowFocus: false, // 윈도우 포커스시 재요청 비활성화
      refetchOnReconnect: true, // 네트워크 재연결시 재요청 활성화
    },
    mutations: {
      retry: 1, // 뮤테이션 실패 시 재시도 횟수
    },
  },
});

// 개발 환경에서 React Query DevTools 활성화
export const enableReactQueryDevTools = process.env.NODE_ENV === 'development';
