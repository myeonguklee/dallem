import React from 'react';
import Link from 'next/link';

interface IHeaderLinkProps {
  href: string;
  children: React.ReactNode;
}

const HeaderLink: React.FunctionComponent<IHeaderLinkProps> = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="hover:text-primary text-base font-semibold text-gray-800 transition-colors"
    >
      {children}
    </Link>
  );
};

export default HeaderLink;
