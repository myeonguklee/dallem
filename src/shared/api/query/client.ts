import { QueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { ApiError } from '../apiError';

const STALE_TIME = 1000 * 60 * 5; // 5분
const GC_TIME = 1000 * 60 * 10; // 10분

const IS_SERVER = typeof window === 'undefined';
const IS_CLIENT = typeof window !== 'undefined';

// SSR을 고려한 QueryClient 팩토리 함수
export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // SSR/CSR 공통 설정
        staleTime: STALE_TIME,
        gcTime: GC_TIME,
        retry: (failureCount, error) => {
          // 네트워크 에러나 5xx 에러만 재시도
          if (error instanceof ApiError) {
            return error.status >= 500 && failureCount < 3;
          }
          // 일반 에러는 1번만 재시도
          return failureCount < 1;
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        refetchOnWindowFocus: false, // CSR 환경에서 윈도우 포커스 시 재요청 비활성화
        refetchOnReconnect: true, // CSR 환경에서 네트워크 재연결 시 재요청 활성화

        // CSR에서만 Suspense/ErrorBoundary 설정
        ...(IS_CLIENT && {
          suspense: true, // 로딩 상태를 Suspense로 처리
          throwOnError: true, // 에러를 throw해서 ErrorBoundary에서 캐치
        }),
      },
      mutations: {
        retry: false, // mutation은 재시도하지 않음
        onError: (error) => {
          // window 객체가 있는지 확인 (클라이언트 환경인지 체크)
          if (IS_SERVER) {
            console.error('Error in SSR:', error);
            return;
          }

          if (error instanceof ApiError) {
            // 4xx대의 예측 가능한 에러는 각 컴포넌트/훅에서 개별 처리하는 것이 좋음
            // 여기서는 5xx대 서버 에러나 처리되지 않은 공통 에러 처리
            if (error.status >= 500) {
              console.error('Server Error:', error.message);
              toast.error(error.message);
            }
            // 필요에 따라 다른 공통 에러 코드 처리
            // 예: if (error.code === 'MAINTENANCE') { ... }
          } else if (error instanceof Error) {
            console.error('Unexpected Error:', error.message);
            toast.error(error.message);
          }
        },
      },
    },
  });

// 개발 환경에서 React Query DevTools 활성화
export const enableReactQueryDevTools = process.env.NODE_ENV === 'development';
