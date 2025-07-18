'use client';

import type { HTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { dropdownItemVariants } from './dropdown-variants';

export interface DropdownItemProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dropdownItemVariants> {}

export const DropdownItem = ({ state, size, className, children, ...props }: DropdownItemProps) => {
  return (
    <div
      className={twMerge(dropdownItemVariants({ state, size }), className)}
      {...props}
    >
      {children}
    </div>
  );
};
