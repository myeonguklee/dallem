'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n';
import { ROUTES } from '@/shared/config/routes';

export const LandingFooter = () => {
  const tc = useTranslations('');

  return (
    <footer className="border-t border-slate-200 bg-white py-8 text-sm text-slate-600">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
        <div className="flex items-center gap-2">
          <span className="text-primary font-medium">{tc('navigation.brand')}</span>
          <span className="hidden text-slate-500 md:inline">· {tc('navigation.desc')}</span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="#features"
            className="hover:text-slate-900"
          >
            {tc('pages.landing.nav.services')}
          </a>
          <a
            href="#how"
            className="hover:text-slate-900"
          >
            {tc('pages.landing.nav.how')}
          </a>
          <a
            href="#stories"
            className="hover:text-slate-900"
          >
            {tc('pages.landing.nav.stories')}
          </a>
          <a
            href="#faq"
            className="hover:text-slate-900"
          >
            {tc('pages.landing.nav.faq')}
          </a>
          <Link
            href={ROUTES.GATHERING}
            className="text-primary font-semibold hover:underline"
          >
            {tc('pages.landing.nav.view')}
          </Link>
        </div>
      </div>
    </footer>
  );
};
