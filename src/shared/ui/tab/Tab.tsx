import React, { HTMLAttributes } from 'react';
import { cn } from '@/shared/lib';
import { VariantProps, cva } from 'class-variance-authority';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TabProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'>,
    VariantProps<typeof TabVariants> {
  items: TabItem[];
  selectedId: string;
  onSelect: (id: string) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  orientation?: 'horizontal' | 'vertical';
}

const TabVariants = cva('flex items-center gap-1 cursor-pointer font-bold transition-colors', {
  variants: {
    isSelected: {
      true: 'text-[var(--color-font-base)]',
      false: 'text-gray-500',
    },
    disabled: {
      true: 'opacity-50 cursor-not-allowed pointer-events-none',
      false: '',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    isSelected: false,
    disabled: false,
    size: 'md',
  },
});

const TabContainerVariants = cva('flex gap-8', {
  variants: {
    orientation: {
      horizontal: 'flex gap-8',
      vertical: 'flex flex-col gap-4',
    },
    size: {
      sm: 'gap-4',
      md: 'gap-8',
      lg: 'gap-12',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    size: 'md',
  },
});

export const Tab = ({
  items,
  selectedId,
  onSelect,
  disabled = false,
  size = 'md',
  orientation = 'horizontal',
  className = '',
  ...props
}: TabProps) => {
  return (
    <div
      className={cn(TabContainerVariants({ orientation, size }), className)}
      {...props}
    >
      {items.map((item) => {
        const isSelected = item.id === selectedId;
        const isDisabled = disabled || item.disabled;

        return (
          <div key={item.id}>
            <button
              onClick={() => !isDisabled && onSelect(item.id)}
              className={cn(TabVariants({ isSelected, disabled: isDisabled, size }))}
            >
              <span>{item.label}</span>
              {item.icon && <span className="flex items-center">{item.icon}</span>}
            </button>
          </div>
        );
      })}
    </div>
  );
};
