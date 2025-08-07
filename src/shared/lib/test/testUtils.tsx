import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 테스트용 QueryClient 생성 함수
export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity, // 테스트 중에 캐시 무효화 방지
      },
      mutations: {
        retry: false,
      },
    },
  });

// 테스트용 wrapper 컴포넌트
export const TestWrapper = ({ children }: { children: ReactNode }) => {
  const queryClient = createTestQueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

// React Query Mock 헬퍼 함수
export const createReactQueryMock = () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
  useInfiniteQuery: jest.fn(),
});

// Mock 세션 데이터 생성 함수
export const createMockSession = (overrides = {}) => ({
  user: {
    id: '1',
    email: 'test@example.com',
    name: '테스트 사용자',
    accessToken: 'mock-access-token',
    ...overrides,
  },
});

// Mock 사용자 데이터 생성 함수
export const createMockUser = (overrides = {}) => ({
  id: 1,
  email: 'test@example.com',
  name: '테스트 사용자',
  companyName: '테스트 회사',
  image: 'https://example.com/image.jpg',
  ...overrides,
});

// Mock 모임 데이터 생성 함수
export const createMockGathering = (overrides = {}) => ({
  id: 1,
  type: 'DALLAEMFIT',
  name: '테스트 모임',
  dateTime: '2024-01-15T10:00:00Z',
  registrationEnd: '2024-01-14T10:00:00Z',
  location: 'SEOUL',
  participantCount: 5,
  capacity: 10,
  image: 'https://example.com/gathering.jpg',
  createdBy: 1,
  canceledAt: null,
  ...overrides,
});
