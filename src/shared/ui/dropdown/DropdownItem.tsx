'use client';

import type { HTMLAttributes } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { dropdownItemVariants } from './dropdown-variants';

export interface DropdownItemProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'>,
    VariantProps<typeof dropdownItemVariants> {
  value: string;
  selectedValue?: string;
  onSelect?: (value: string) => void;
}

export const DropdownItem = ({
  state,
  size,
  className,
  children,
  value,
  selectedValue,
  onSelect,
  onClick,
  ...props
}: DropdownItemProps) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onSelect?.(value);
    onClick?.(e);
  };

  // 자동으로 선택 상태 계산
  const isSelected = selectedValue === value;
  const currentState = isSelected ? 'selected' : state || 'default';

  return (
    <div
      className={twMerge(dropdownItemVariants({ state: currentState, size }), className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  );
};
