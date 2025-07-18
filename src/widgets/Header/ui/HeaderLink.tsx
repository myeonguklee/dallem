import React, { ComponentPropsWithoutRef } from 'react';
import { Locale } from '@/i18n';
import { Link } from '@/i18n/navigation';

interface HeaderLinkProps extends ComponentPropsWithoutRef<'a'> {
  href: string;
  locale?: Locale;
}

export const HeaderLink: React.FunctionComponent<HeaderLinkProps> = ({
  href,
  locale,
  children,
  ...props
}) => {
  return (
    <Link
      href={href}
      locale={locale}
      className="hover:text-primary text-base font-semibold text-gray-800 transition-colors"
      {...props}
    >
      {children}
    </Link>
  );
};
