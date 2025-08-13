'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n';
import { ROUTES } from '@/shared/config/routes';
import { cn } from '@/shared/lib';
import { SparkleIcon } from '@/shared/ui/icon/icons/SparkleIcon';

type LogoProps = {
  className?: string;
};

export const Logo = ({ className }: LogoProps) => {
  const t = useTranslations('navigation');
  const locale = useLocale();
  return (
    <Link
      href={ROUTES.LANDING}
      locale={locale}
      className="flex items-center gap-2"
      aria-label={`${t('brand')} · ${t('desc')}`}
    >
      <SparkleIcon
        className="text-primary h-6 w-6"
        aria-hidden="true"
        focusable="false"
      />
      <span className={cn('text-primary text-2xl font-extrabold', className)}>{t('brand')}</span>
      <span className="tablet:block ml-2 flex hidden items-center gap-2 rounded-full bg-orange-50 px-2 py-0.5 text-[10px] text-orange-700">
        {t('desc')}
      </span>
    </Link>
  );
};
