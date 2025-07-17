import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { defaultLocale, locales } from './src/i18n';

const intlMiddleware = createMiddleware({
  // 지원하는 언어 목록
  locales,
  // 기본 언어
  defaultLocale,
  // URL에서 언어 코드를 항상 표시
  localePrefix: 'always',
  // 디버깅을 위한 로그 추가
  localeDetection: true,
  // 에러 발생 시 기본 언어로 리다이렉트
  alternateLinks: true,
});

export default function middleware(request: NextRequest) {
  try {
    console.log('Middleware called for:', request.url);
    return intlMiddleware(request);
  } catch (error) {
    console.error('Middleware error:', error);
    // 에러 발생 시 기본 언어로 리다이렉트
    const url = new URL(request.url);
    url.pathname = `/${defaultLocale}${url.pathname}`;
    return Response.redirect(url);
  }
}

export const config = {
  // 미들웨어가 적용될 경로
  matcher: [
    // 모든 경로에 적용하되, 정적 파일과 API는 제외
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
