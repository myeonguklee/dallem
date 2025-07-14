'use client';

import type { FC, HTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { dropdownTriggerVariants } from './dropdown-variants';

export interface DropdownTriggerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dropdownTriggerVariants> {}

export const DropdownTrigger: FC<DropdownTriggerProps> = ({
  size,
  state,
  className,
  children,
  ...props
}) => (
  <div
    className={clsx(dropdownTriggerVariants({ size, state }), className)}
    {...props}
  >
    {children}
  </div>
);
