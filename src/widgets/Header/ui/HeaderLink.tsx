import { ComponentPropsWithoutRef } from 'react';
import { useLocale } from 'next-intl';
import { Link, Pathnames } from '@/i18n';

interface HeaderLinkProps extends ComponentPropsWithoutRef<'a'> {
  href: Exclude<Pathnames, '/gathering/[id]'>;
}

export const HeaderLink = ({ href, children, ...props }: HeaderLinkProps) => {
  const locale = useLocale();

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
