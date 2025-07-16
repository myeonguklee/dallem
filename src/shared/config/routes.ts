import { Locale } from '@/i18n';

// 기본 라우트 정의 (locale 제외)
export const BASE_ROUTES = {
  ROOT: '/',
  GATHERINGS: '/gatherings',
  HEART: '/heart',
  REVIEW: '/reviews',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  PROFILE: '/profile',
} as const;

// locale을 포함한 라우트 생성 함수
export const createLocalizedRoute = (locale: Locale, path: string) => `/${locale}${path}`;

// 각 라우트별 생성 함수
export const ROUTES = {
  ROOT: (locale: Locale) => createLocalizedRoute(locale, BASE_ROUTES.ROOT),
  GATHERINGS: (locale: Locale) => createLocalizedRoute(locale, BASE_ROUTES.GATHERINGS),
  HEART: (locale: Locale) => createLocalizedRoute(locale, BASE_ROUTES.HEART),
  REVIEW: (locale: Locale) => createLocalizedRoute(locale, BASE_ROUTES.REVIEW),
  SIGNIN: (locale: Locale) => createLocalizedRoute(locale, BASE_ROUTES.SIGNIN),
  SIGNUP: (locale: Locale) => createLocalizedRoute(locale, BASE_ROUTES.SIGNUP),
  PROFILE: (locale: Locale) => createLocalizedRoute(locale, BASE_ROUTES.PROFILE),
} as const;

// 타입 정의
export type RouteKey = keyof typeof BASE_ROUTES;
export type LocalizedRoute = (locale: Locale) => string;
