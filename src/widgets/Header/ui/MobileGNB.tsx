'use client';

import { useEffect, useState } from 'react';
import { Locale } from '@/i18n';
import { ROUTES } from '@/shared/config/routes';
import { Icon, XIcon } from '@/shared/ui/icon';
import clsx from 'clsx';
import HeaderLink from './HeaderLink';

interface MobileGNBProps {
  locale: Locale;
}

export const MobileGNB = ({ locale }: MobileGNBProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (
        window.innerWidth >=
        parseInt(getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-md')) //744
      ) {
        setOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="tablet:hidden cursor-pointer"
        aria-label="Open menu"
      >
        <Icon
          name="hamburger-menu"
          className="tablet:hidden"
          width="24"
          height="24"
        />
      </button>

      {/* 오버레이 */}
      <div
        className={clsx(
          'fixed inset-0 z-[var(--z-backdrop)] bg-black/50 transition-opacity duration-300',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={() => setOpen(false)}
      />

      {/* 드로워 */}
      <nav
        className={clsx(
          'fixed top-0 left-0 z-[var(--z-drawer)] h-full w-64 bg-white shadow transition-transform duration-300',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-14 items-center justify-end p-4">
          <button onClick={() => setOpen(false)}>
            <XIcon className="h-6 w-6 cursor-pointer" />
          </button>
        </div>
        <ul className="flex flex-col gap-4 p-4 text-center">
          <li>
            <HeaderLink href={ROUTES.GATHERINGS(locale)}>모임 찾기</HeaderLink>
          </li>
          <li>
            <HeaderLink href={ROUTES.HEART(locale)}>찜한 모임</HeaderLink>
          </li>
          <li>
            <HeaderLink href={ROUTES.REVIEW(locale)}>모든 리뷰</HeaderLink>
          </li>
        </ul>
      </nav>
    </>
  );
};
