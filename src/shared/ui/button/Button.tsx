import React, { ButtonHTMLAttributes } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {}

const ButtonVariants = cva(
  'flex items-center justify-center transition-colors py-2 px-6 font-base',
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--color-primary)] text-white rounded-[var(--radius-button)] hover:bg-orange-600',
        outline:
          'border border-[var(--color-primary)] bg-white text-[var(--color-primary)] rounded-[var(--radius-button)] hover:bg-orange-600 hover:text-white',
        default: 'bg-gray-500 text-white rounded-[var(--radius-button)] hover:bg-gray-600',
        ghost: 'bg-transparent text-[var(--color-font-base)]',
      },
      isDisabled: {
        true: ' opacity-50 pointer-events-none',
        false: 'opacity-100 ',
      },
      isActive: {
        true: 'font-black text-[var(--color-font-base)]',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

export const Button = ({
  children,
  variant = 'primary',
  className = '',
  disabled = false,
  isActive = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled}
      type={props.type || 'button'}
      className={twMerge(
        clsx(ButtonVariants({ variant, isDisabled: disabled, isActive }), className),
      )}
    >
      {children}
    </button>
  );
};
