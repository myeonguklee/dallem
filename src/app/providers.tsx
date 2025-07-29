'use client';

// 클라이언트 컴포넌트임을 명시
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ReactQueryProvider } from '@/shared/api';
import { ToastProvider } from '@/shared/ui/toast';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <ReactQueryProvider>
        {children}
        <ToastProvider />
      </ReactQueryProvider>
    </SessionProvider>
  );
}
