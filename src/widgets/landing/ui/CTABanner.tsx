'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n';
import { ROUTES } from '@/shared/config/routes';
import { FadeIn } from '@/shared/ui/FadeIn';

export const CTABanner = () => {
  const t = useTranslations('pages.landing');
  return (
    <section className="px-4 py-16 md:px-6">
      <FadeIn>
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-orange-400/10 via-amber-400/10 to-yellow-400/10 p-8 text-center shadow-sm">
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            {t('ctaBanner.title')}
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-600">{t('ctaBanner.desc')}</p>
          <div className="mt-6">
            <Link
              href={ROUTES.GATHERING}
              className="bg-primary inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold text-white shadow-sm ring-1 transition hover:-translate-y-0.5"
            >
              {t('ctaBanner.button')}
            </Link>
          </div>
        </div>
      </FadeIn>
    </section>
  );
};
