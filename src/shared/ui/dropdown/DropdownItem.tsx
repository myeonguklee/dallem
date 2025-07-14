'use client';

import type { FC, HTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { dropdownItemVariants } from './dropdown-variants';

export interface DropdownItemProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dropdownItemVariants> {}

export const DropdownItem: FC<DropdownItemProps> = ({ state, className, children, ...props }) => (
  <div
    className={clsx(dropdownItemVariants({ state }), className)}
    {...props}
  >
    {children}
  </div>
);
