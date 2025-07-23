export const localeUrlFormatter = (url: string): string => {
  if (typeof window === 'undefined') return url; // SSR 방어

  const pathname = window.location.pathname;
  const locale = pathname.startsWith('/en') ? 'en' : 'ko';

  return `/${locale}/${url.replace(/^\/+/, '')}`; // url 맨 앞의 슬래시 제거
};
