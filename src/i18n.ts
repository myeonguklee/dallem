import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// 지원하는 언어 목록
export const locales = ['ko', 'en'] as const;
export type Locale = (typeof locales)[number];

// 기본 언어 설정
export const defaultLocale: Locale = 'ko';

export default getRequestConfig(async ({ requestLocale }) => {
  // requestLocale 사용 (4.0 권장사항)
  const currentLocale = await requestLocale;

  // 디버깅을 위한 로그
  console.log('Request config called with locale:', currentLocale);

  // 지원하지 않는 언어인 경우 기본 언어로 fallback
  if (!locales.includes(currentLocale as Locale)) {
    console.log('Unsupported locale:', currentLocale, 'falling back to:', defaultLocale);
    const messages = (await import(`./app/messages/${defaultLocale}.json`)).default;
    console.log('Messages loaded for locale:', defaultLocale);
    return {
      messages,
      locale: defaultLocale,
    };
  }

  try {
    const messages = (await import(`./app/messages/${currentLocale}.json`)).default;
    console.log('Messages loaded for locale:', currentLocale);
    return {
      messages,
      locale: currentLocale as string,
    };
  } catch (error) {
    console.error('Failed to load messages for locale:', currentLocale, error);
    // 에러 발생 시 기본 언어로 fallback
    try {
      const fallbackMessages = (await import(`./app/messages/${defaultLocale}.json`)).default;
      console.log('Fallback messages loaded for locale:', defaultLocale);
      return {
        messages: fallbackMessages,
        locale: defaultLocale,
      };
    } catch (fallbackError) {
      console.error('Failed to load fallback messages:', fallbackError);
      notFound();
    }
  }
});
