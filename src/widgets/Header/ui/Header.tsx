'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { ROUTES } from '@/shared/config/routes';
import { LanguageSwitcher } from '@/shared/ui/language-switcher/LanguageSwitcher';
import HeaderLink from './HeaderLink';
import Logo from './Logo';
import { MobileGNB } from './MobileGNB';

const Header = () => {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const locale = pathname.startsWith('/en') ? 'en' : 'ko';

  return (
    <header className="tablet:h-15 px-mobile-padding tablet:px-tablet-padding relative flex h-14 justify-center gap-5 border-b border-gray-200 bg-white">
      <div className="web:max-w-web flex w-full items-center justify-between">
        <div className="flex items-center gap-5">
          <MobileGNB />
          <Logo className="tablet:h-15 tablet:relative tablet:left-0 tablet:-translate-x-0 absolute top-0 left-1/2 h-14 -translate-x-1/2 content-center justify-self-center" />

          <nav className="tablet:flex hidden gap-6">
            <HeaderLink
              href={ROUTES.GATHERING}
              locale={locale}
            >
              {t('findGatherings')}
            </HeaderLink>
            <HeaderLink
              href={ROUTES.FAVORITE}
              locale={locale}
            >
              {t('favoriteGatherings')}
            </HeaderLink>
            <HeaderLink
              href={ROUTES.REVIEW}
              locale={locale}
            >
              {t('allReviews')}
            </HeaderLink>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher currentLocale={locale} />
          <Link
            href={ROUTES.SIGNIN}
            locale={locale}
            className="bg-primary w-[3.875rem] rounded-[5px] px-2.5 py-1 font-semibold text-white hover:bg-orange-600"
          >
            {t('signin')}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
