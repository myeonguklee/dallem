'use client';

// 클라이언트 컴포넌트임을 명시
import { ReactNode, useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ReactQueryProvider } from '@/shared/api';
import { ToastProvider } from '@/shared/ui/toast';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    // 개발 환경에서만 MSW 시작
    if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_MSW === 'true') {
      // 클라이언트 사이드 MSW 시작
      import('@/shared/lib/msw/startWorker').then(({ startWorker }) => {
        startWorker();
      });
    }
  }, []);

  return (
    <SessionProvider>
      <ReactQueryProvider>
        {children}
        <ToastProvider />
      </ReactQueryProvider>
    </SessionProvider>
  );
}
