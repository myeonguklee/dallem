import type { Metadata } from 'next';
import { ReactQueryProvider } from '@/shared/api';
import { ToastProvider } from '@/shared/ui/toast';
import { Pretendard } from './fonts/pretendard';
import './globals.css';

export const metadata: Metadata = {
  title: '같이달램',
  description: '함께하는 모임으로 건강하고 활기찬 직장생활을 만들어보세요',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
    >
      <body
        className={`${Pretendard.className} antialiased`}
        suppressHydrationWarning
      >
        <ReactQueryProvider>
          {children}
          <ToastProvider />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
