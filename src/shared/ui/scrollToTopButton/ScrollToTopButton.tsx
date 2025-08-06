'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/shared/lib';
import { cva } from 'class-variance-authority';
import { ArrowUpIcon } from '../icon';

const ScrollToTopButtonVariants = cva(
  [
    'fixed bottom-[30px] right-[30px]',
    'w-[48px] h-[48px] rounded-full border-none bg-[var(--color-primary)]',
    'flex items-center justify-center',
    'cursor-pointer z-[1000]',
    'shadow-[0_4px_20px_rgba(0,0,0,0.3)]',
    'transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
  ],
  {
    variants: {
      visible: {
        true: 'opacity-100 visible translate-y-0',
        false: 'opacity-0 invisible translate-y-5',
      },
    },
    defaultVariants: {
      visible: false,
    },
  },
);

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const showBtn = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', showBtn);

    return () => window.removeEventListener('scroll', showBtn);
  }, []);

  const handleClickTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div
        aria-label="페이지 상단으로 이동"
        className={cn(ScrollToTopButtonVariants({ visible: isVisible }))}
        onClick={handleClickTop}
      >
        <ArrowUpIcon />
      </div>
    </>
  );
};
