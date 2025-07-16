'use client';

import { usePathname } from 'next/navigation';
import { type Locale, locales } from '@/i18n';

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();

  const handleLanguageChange = async (newLocale: Locale) => {
    console.log('Button clicked for language:', newLocale);

    // 현재 경로에서 언어 코드를 제거
    const pathSegments = pathname.split('/').filter(Boolean);
    const isFirstSegmentLocale = locales.includes(pathSegments[0] as Locale);

    // 언어 코드를 제거한 경로 구성
    const pathWithoutLocale = isFirstSegmentLocale
      ? pathSegments.slice(1).join('/')
      : pathSegments.join('/');

    // 새로운 경로 구성
    const newPath = pathWithoutLocale ? `/${newLocale}/${pathWithoutLocale}` : `/${newLocale}`;

    console.log('Language change:', {
      currentLocale,
      newLocale,
      pathname,
      newPath,
    });

    // 강제로 페이지를 새로고침하여 서버 컴포넌트 재렌더링
    window.location.replace(newPath);
  };

  return (
    <div className="flex items-center space-x-2">
      {locales.map((lang) => (
        <button
          key={lang}
          onClick={() => handleLanguageChange(lang)}
          className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
            currentLocale === lang
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {lang === 'ko' ? '🇰🇷 한국어' : '🇺🇸 English'}
        </button>
      ))}
    </div>
  );
}
