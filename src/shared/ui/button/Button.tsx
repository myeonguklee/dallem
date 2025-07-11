import React, { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: 'primary' | 'outline' | 'default' | 'ghost';
  className?: string;
}

export const Button = ({
  children,
  variant = 'primary',
  className = '',
  disabled = false,
  ...props
}: ButtonProps) => {
  const base = ' flex items-center justify-center transition-colors py-3 px-4 h-11 font-base';

  const variantsClass = {
    primary: 'bg-[var(--color-primary)] text-white rounded-[var(--radius-common)] ',
    outline:
      'border border-[var(--color-primary)] bg-white text-[var(--color-primary)] rounded-[var(--radius-common)] ',
    default: 'bg-gray-500 text-white rounded-[var(--radius-common)] ',
    ghost: ' bg-transparent text-[var(--color-font-base)] opacity-50',
  };

  const hoverClass = {
    primary: 'hover:bg-orange-600',
    outline: 'hover:bg-orange-600 hover:text-white',
    default: 'hover:bg-gray-600',
    ghost: ' hover:text-[var(--color-font-base)] hover:opacity-100',
  };

  const combinedClasses = [
    base,
    variantsClass[variant],
    !disabled && hoverClass[variant],
    !disabled && 'cursor-pointer',
    disabled && 'opacity-50 ',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      {...props}
      disabled={disabled}
      type={props.type || 'button'}
      className={combinedClasses}
    >
      {children}
    </button>
  );
};
