import React, { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: 'primary' | 'outline' | 'default';
  className?: string;
}

export const Button = ({
  children,
  variant = 'primary',
  className = '',
  disabled = false,
  ...props
}: ButtonProps) => {
  const base =
    'rounded-[var(--radius-common)] flex items-center justify-center transition-colors py-3 px-8 h-11 font-base';

  const variantsClass = {
    primary: 'bg-[var(--color-primary)] text-white ',
    outline: 'border border-[var(--color-primary)] bg-white text-[var(--color-primary)]  ',
    default: 'bg-gray-500 text-white ',
  };

  const hoverClass = {
    primary: 'hover:bg-orange-600',
    outline: 'hover:bg-orange-600 hover:text-white',
    default: 'hover:bg-gray-600',
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
