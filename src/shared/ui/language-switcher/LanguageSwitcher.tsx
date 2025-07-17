'use client';

import { useTransition } from 'react';
import { createNavigation } from 'next-intl/navigation';
import { type Locale, locales } from '@/i18n';

const { useRouter, usePathname } = createNavigation({ locales });

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (newLocale: Locale) => {
    startTransition(() => {
      let pathnameWithoutLocale = pathname;

      // 현재 경로에서 언어 코드를 제거
      for (const locale of locales) {
        const localePrefix = `/${locale}`;
        if (pathname.startsWith(localePrefix)) {
          pathnameWithoutLocale = pathname.replace(localePrefix, '');
          break;
        }
      }

      // 언어 코드를 제거한 경로가 비어있거나 '/'인 경우, '/'로 설정
      if (!pathnameWithoutLocale || pathnameWithoutLocale === '/') {
        pathnameWithoutLocale = '/';
      }

      router.replace(pathnameWithoutLocale, { locale: newLocale });
    });
  };

  return (
    <div className="flex items-center space-x-2">
      {locales.map((lang) => (
        <button
          key={lang}
          onClick={() => handleLanguageChange(lang)}
          disabled={isPending}
          className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
            currentLocale === lang
              ? 'bg-amber-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          } ${isPending ? 'cursor-not-allowed opacity-70' : ''}`}
        >
          {lang === 'ko' ? '🇰🇷 한국어' : '🇺🇸 English'}
        </button>
      ))}
    </div>
  );
}
