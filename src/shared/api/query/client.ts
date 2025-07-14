import { ApiError } from '@/shared/api/apiError';
import { QueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

const STALE_TIME = 1000 * 60 * 5; // 5분
const GARBAGE_COLLECTION_TIME = 1000 * 60 * 10; // 10분

const IS_SERVER = typeof window === 'undefined';
const IS_CLIENT = typeof window !== 'undefined';

// SSR을 고려한 QueryClient 팩토리 함수
export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // SSR/CSR 공통 설정
        staleTime: STALE_TIME,
        gcTime: GARBAGE_COLLECTION_TIME,
        retry: (failureCount, error) => {
          // ApiError는 5xx 에러만 재시도
          if (error instanceof ApiError) {
            return error.status >= 500 && failureCount < 3;
          }
          // 일반 Error (네트워크 에러 포함)는 1번만 재시도
          return failureCount < 1;
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        refetchOnWindowFocus: false, // 윈도우 포커스 시 재요청 비활성화
        refetchOnReconnect: true, // 네트워크 재연결 시 재요청 활성화

        // 클라이언트 환경에서만 ErrorBoundary 설정
        ...(IS_CLIENT && {
          throwOnError: true, // 에러를 throw해서 ErrorBoundary에서 캐치
          suspense: true, // suspense 활성화
        }),
      },
      mutations: {
        retry: false, // mutation은 재시도하지 않음
        onError: (error) => {
          // SSR 환경에서는 토스트 표시하지 않음
          if (IS_SERVER) {
            console.error('Error in SSR:', error);
            return;
          }
          // 모든 에러에 대해 토스트 메시지 표시 (서버 메시지 사용)
          console.error('Error:', error.message);
          toast.error(error.message);
          // 개별 mutation에서 onError 설정시 이 전역 설정은 무시됨
        },
      },
    },
  });

// 개발 환경에서 React Query DevTools 활성화
export const enableReactQueryDevTools = process.env.NODE_ENV === 'development';
