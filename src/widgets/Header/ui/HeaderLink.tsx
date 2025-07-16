import React, { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';

interface HeaderLinkProps extends ComponentPropsWithoutRef<'a'> {
  href: string;
}

const HeaderLink: React.FunctionComponent<HeaderLinkProps> = ({ href, children, ...props }) => {
  return (
    <Link
      href={href}
      className="hover:text-primary text-base font-semibold text-gray-800 transition-colors"
      {...props}
    >
      {children}
    </Link>
  );
};

export default HeaderLink;
