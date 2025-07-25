'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n';
import { ROUTES } from '@/shared/config/routes';
import { cn } from '@/shared/lib';

type LogoProps = {
  className?: string;
};

export const Logo = ({ className }: LogoProps) => {
  const t = useTranslations('navigation');
  const locale = useLocale();
  return (
    <Link
      href={ROUTES.ROOT}
      locale={locale}
    >
      <span className={cn('text-primary text-2xl font-extrabold', className)}>{t('brand')}</span>
    </Link>
  );
};
