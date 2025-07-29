import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  if (process.env.NODE_ENV === 'development') {
    console.log('🌐 Request config - locale:', locale);
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
