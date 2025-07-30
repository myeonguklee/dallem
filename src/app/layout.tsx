import type { Metadata } from 'next';
import { Pretendard } from '@/app/fonts/pretendard';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

export const metadata: Metadata = {
  title: '달램',
  description: '함께하는 모임으로 건강하고 활기찬 직장생활을 만들어보세요',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={Pretendard.className}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
