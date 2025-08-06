'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from '@/i18n';
import { ROUTES } from '@/shared/config/routes';
import { Icon, XIcon } from '@/shared/ui/icon';
import clsx from 'clsx';
import { HeaderLink } from './HeaderLink';

export const MobileGNB = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const locale = useLocale();

  const menuItems = [
    { href: ROUTES.GATHERING, label: t('findGatherings') },
    { href: ROUTES.FAVORITE, label: t('favoriteGatherings') },
    { href: ROUTES.REVIEW, label: t('allReviews') },
  ];

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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // ESC 키로 메뉴 닫기
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="tablet:hidden cursor-pointer"
        aria-label={t('aria.openMenu')}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-haspopup="dialog"
      >
        <Icon
          name="hamburger-menu"
          className="tablet:hidden"
          width="24"
          height="24"
          aria-hidden="true"
        />
      </button>

      {/* 오버레이 */}
      {open && (
        <div
          className="fixed inset-0 z-[var(--z-backdrop)] bg-black/50 transition-opacity duration-300"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* 드로워 */}
      <nav
        id="mobile-menu"
        className={clsx(
          'fixed top-0 left-0 z-[var(--z-drawer)] h-full bg-white shadow transition-transform duration-300',
          open ? 'translate-x-0' : '-translate-x-full',
          locale === 'ko' ? 'w-40' : 'w-45',
        )}
        aria-label={t('aria.menu')}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        tabIndex={open ? 0 : -1}
      >
        <div className="flex h-14 items-center justify-end p-4">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t('aria.closeMenu')}
            className="rounded focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:outline-none"
            disabled={!open}
            tabIndex={open ? 0 : -1}
          >
            <XIcon
              className="h-6 w-6 cursor-pointer"
              aria-hidden="true"
            />
          </button>
        </div>
        <ul
          className="flex flex-col gap-8 p-4 text-center"
          role="menubar"
        >
          {menuItems.map((item) => (
            <li
              key={item.href}
              role="none"
            >
              <HeaderLink
                href={item.href}
                role="menuitem"
                className="block w-full text-left"
                tabIndex={open ? 0 : -1}
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
              >
                {item.label}
              </HeaderLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};
