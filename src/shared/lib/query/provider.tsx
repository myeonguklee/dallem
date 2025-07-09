'use client';

import { type ReactNode, useState } from 'react';
import { queryClient as defaultQueryClient } from '@/shared/api/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { enableReactQueryDevTools } from './client';

interface ReactQueryProviderProps {
  children: ReactNode;
}

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  const [queryClient] = useState(() => defaultQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* 토스트 UI를 앱 전체에서 사용할 수 있도록 추가 */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
      {enableReactQueryDevTools && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}
