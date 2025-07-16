'use client';

import * as React from 'react';
import Link from 'next/link';
import { Locale } from '@/i18n';
import { ROUTES } from '@/shared/config/routes';
import { cn } from '@/shared/lib/cn';

type LogoProps = {
  className?: string;
  locale: Locale;
};

const Logo = ({ className, locale }: LogoProps) => {
  return (
    <Link href={ROUTES.ROOT(locale)}>
      <span className={cn('text-primary text-2xl font-extrabold', className)}>같이달램</span>
    </Link>
  );
};

export default Logo;
