import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/shared/lib/cn';

type LogoProps = {
  className?: string;
};

const Logo: React.FunctionComponent<LogoProps> = ({ className }) => {
  return (
    <Link href="/">
      <span className={cn('text-primary text-2xl font-extrabold', className)}>같이달램</span>
    </Link>
  );
};

export default Logo;
