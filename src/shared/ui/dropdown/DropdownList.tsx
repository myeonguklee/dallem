'use client';

import type { FC, HTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface DropdownListProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
}

export const DropdownList: FC<DropdownListProps> = ({ isOpen, className, children, ...props }) => {
  if (!isOpen) return null;
  return (
    <div
      className={clsx('mt-1 rounded border border-gray-200 bg-white shadow-sm', className)}
      {...props}
    >
      {children}
    </div>
  );
};
