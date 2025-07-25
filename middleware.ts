import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // 정적 파일, API, Next.js 내부 파일 제외
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
