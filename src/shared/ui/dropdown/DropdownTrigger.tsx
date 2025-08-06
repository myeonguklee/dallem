'use client';

import type { ButtonHTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { dropdownTriggerVariants } from './dropdown-variants';

export interface DropdownTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof dropdownTriggerVariants> {
  isOpen?: boolean;
}

export const DropdownTrigger = ({
  size,
  state,
  className,
  children,
  isOpen,
  ...props
}: DropdownTriggerProps) => {
  return (
    <button
      className={twMerge(dropdownTriggerVariants({ size, state }), className)}
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      {...props}
    >
      {children}
    </button>
  );
};
