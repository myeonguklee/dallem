import { QueryClient } from '@tanstack/react-query';
import { ApiError } from './apiError';

const STALE_TIME = 1000 * 60 * 5; // 5분
const GC_TIME = 1000 * 60 * 30; // 30분

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME,
      gcTime: GC_TIME,
      refetchOnWindowFocus: false, // 창 포커스 시 자동 refetch 여부
      retry: 1, // 쿼리 실패 시 재시도 횟수
    },
    mutations: {
      onError: (error) => {
        if (error instanceof ApiError) {
          // 4xx대의 예측 가능한 에러는 각 컴포넌트/훅에서 개별 처리하는 것이 좋음
          // 여기서는 5xx대 서버 에러나 처리되지 않은 공통 에러 처리
          if (error.status >= 500) {
            console.error('Server Error:', error.message);
          }
          // 필요에 따라 다른 공통 에러 코드 처리
          // 예: if (error.code === 'MAINTENANCE') { ... }
        } else if (error instanceof Error) {
          console.error('Unexpected Error:', error.message);
        }
      },
    },
  },
});
