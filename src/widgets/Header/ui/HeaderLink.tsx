import React, { ComponentPropsWithoutRef } from 'react';
import { Link } from '@/i18n/navigation';
import { usePathname } from '@/i18n/navigation';

interface HeaderLinkProps extends ComponentPropsWithoutRef<'a'> {
  href: string;
}

export const HeaderLink: React.FunctionComponent<HeaderLinkProps> = ({
  href,
  // locale,
  children,
  ...props
}) => {
  const pathname = usePathname();
  const locale = pathname.startsWith('/en') ? 'en' : 'ko';
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
