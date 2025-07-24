'use client';

import { useTransition } from 'react';
import { createNavigation } from 'next-intl/navigation';
import { type Locale, locales } from '@/i18n';
import { Dropdown } from '@/shared/ui/dropdown';
import { DropdownTrigger } from '@/shared/ui/dropdown';
import { DropdownList } from '@/shared/ui/dropdown';
import { DropdownItem } from '@/shared/ui/dropdown';
import { LanguageIcon } from '@/shared/ui/icon/icons/LanguageIcon';

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
        if (pathname === localePrefix || pathname.startsWith(localePrefix)) {
          pathnameWithoutLocale = pathname.slice(localePrefix.length);
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

  const getLanguageText = (locale: Locale) => {
    return locale === 'ko' ? '한국어' : 'English';
  };

  return (
    <Dropdown>
      {({ isOpen, toggle, onSelect: closeDropdown }) => (
        <div className="relative inline-block">
          <DropdownTrigger
            onClick={toggle}
            disabled={isPending}
            size="small"
            className="flex h-7.5 !w-auto items-center justify-center rounded-full border border-gray-200 bg-white px-1.5 py-0 transition-colors hover:border-gray-300 hover:bg-gray-50"
          >
            <LanguageIcon
              size={16}
              className="text-gray-600"
            />
          </DropdownTrigger>

          <DropdownList
            isOpen={isOpen}
            className="absolute top-full left-0 z-[var(--z-dropdown)] mt-1 !w-[120px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
          >
            {/* 헤더 섹션 */}
            <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
              <div className="flex items-center gap-2">
                <LanguageIcon
                  size={14}
                  className="text-gray-500"
                />
                <span className="text-sm font-medium text-gray-700">언어 선택</span>
              </div>
            </div>

            {/* 언어 옵션들 */}
            {locales.map((lang) => (
              <DropdownItem
                key={lang}
                value={lang}
                selectedValue={currentLocale}
                onSelect={(value) => {
                  handleLanguageChange(value as Locale);
                  closeDropdown(value);
                }}
                size="small"
                className={`!w-full px-4 py-3 text-left ${
                  isPending ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{getLanguageText(lang)}</span>
                </div>
              </DropdownItem>
            ))}
          </DropdownList>
        </div>
      )}
    </Dropdown>
  );
}
