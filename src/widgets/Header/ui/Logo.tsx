'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { ROUTES } from '@/shared/config/routes';
import { cn } from '@/shared/lib/cn';

type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const locale = pathname.startsWith('/en') ? 'en' : 'ko';
  return (
    <Link
      href={ROUTES.ROOT}
      locale={locale}
    >
      <span className={cn('text-primary text-2xl font-extrabold', className)}>{t('brand')}</span>
    </Link>
  );
};

export default Logo;
