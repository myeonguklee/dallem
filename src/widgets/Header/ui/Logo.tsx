import * as React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/shared/config/routes';
import { cn } from '@/shared/lib/cn';

type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => {
  return (
    <Link href={ROUTES.ROOT}>
      <span className={cn('text-primary text-2xl font-extrabold', className)}>같이달램</span>
    </Link>
  );
};

export default Logo;
