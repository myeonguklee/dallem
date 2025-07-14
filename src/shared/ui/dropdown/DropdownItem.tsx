'use client';

import type { FC, HTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { dropdownItemVariants } from './dropdown-variants';

export interface DropdownItemProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dropdownItemVariants> {}

export const DropdownItem: FC<DropdownItemProps> = ({
  state,
  size,
  className,
  children,
  ...props
}) => (
  <div
    className={twMerge(dropdownItemVariants({ state, size }), className)}
    {...props}
  >
    {children}
  </div>
);
