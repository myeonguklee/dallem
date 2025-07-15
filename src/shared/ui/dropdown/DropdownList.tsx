'use client';

import type { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface DropdownListProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
}

export const DropdownList = ({ isOpen, className, children, ...props }: DropdownListProps) => {
  if (!isOpen) return null;

  return (
    <div
      className={twMerge('mt-1 rounded border border-gray-200 bg-white shadow-sm', className)}
      {...props}
    >
      {children}
    </div>
  );
};
