import Link from 'next/link';
import { Locale } from '@/i18n';
import { ROUTES } from '@/shared/config/routes';
import { LanguageSwitcher } from '@/shared/ui/language-switcher';
import HeaderLink from './HeaderLink';
import Logo from './Logo';
import { MobileGNB } from './MobileGNB';

interface HeaderProps {
  locale: Locale;
}

const Header = ({ locale }: HeaderProps) => {
  return (
    <header className="tablet:h-15 px-mobile-padding tablet:px-tablet-padding relative flex h-14 justify-center gap-5 border-b border-gray-200 bg-white">
      <div className="web:max-w-web flex w-full items-center justify-between">
        <div className="flex items-center gap-5">
          <MobileGNB locale={locale} />
          <Logo
            className="tablet:h-15 tablet:relative tablet:left-0 tablet:-translate-x-0 absolute top-0 left-1/2 h-14 -translate-x-1/2 content-center justify-self-center"
            locale={locale}
          />

          <nav className="tablet:flex hidden gap-6">
            <HeaderLink href={ROUTES.GATHERINGS(locale)}>모임 찾기</HeaderLink>
            <HeaderLink href={ROUTES.HEART(locale)}>찜한 모임</HeaderLink>
            <HeaderLink href={ROUTES.REVIEW(locale)}>모든 리뷰</HeaderLink>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher currentLocale={locale} />
          <Link
            href={ROUTES.SIGNIN(locale)}
            className="bg-primary w-[3.875rem] rounded-[5px] px-2.5 py-1 font-semibold text-white hover:bg-orange-600"
          >
            로그인
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
