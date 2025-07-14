'use client';

import type { ButtonHTMLAttributes, FC } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { dropdownTriggerVariants } from './dropdown-variants';

export interface DropdownTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof dropdownTriggerVariants> {}

export const DropdownTrigger: FC<DropdownTriggerProps> = ({
  size,
  state,
  className,
  children,
  ...props
}) => (
  <button
    className={twMerge(dropdownTriggerVariants({ size, state }), className)}
    {...props}
  >
    {children}
  </button>
);
