import React from 'react';
import { cn } from '@/shared/lib';
import { VariantProps, cva } from 'class-variance-authority';
import { CheckBoxIcon, VacantCheckBoxIcon } from '../icon';

export interface BoxSelectorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof BoxSelectorVariants> {
  isSelected?: boolean;
  title: string;
  subtitle?: string;
  onSelect?: () => void;
  disabled?: boolean;
  width?: string;
  height?: string;
}

const BoxSelectorVariants = cva(
  'relative flex items-start gap-3 p-4 rounded-lg cursor-pointer transition-all duration-200',
  {
    variants: {
      isSelected: {
        true: 'bg-[#1F2937] text-white',
        false: 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
        false: 'opacity-100',
      },
    },
    defaultVariants: {
      isSelected: false,
      disabled: false,
    },
  },
);

export const BoxSelector = ({
  isSelected = false,
  title,
  subtitle,
  onSelect,
  disabled = false,
  width = '150px',
  height = '70px',
  className = '',
  ...props
}: BoxSelectorProps) => {
  const handleClick = () => {
    if (!disabled && onSelect) {
      onSelect();
    }
  };

  return (
    <div
      {...props}
      onClick={handleClick}
      className={cn(BoxSelectorVariants({ isSelected, disabled }), className)}
      style={{ width, height }}
    >
      <div className="mt-1 flex-shrink-0">
        {isSelected ? <CheckBoxIcon size={20} /> : <VacantCheckBoxIcon size={20} />}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <div className="truncate text-sm leading-tight font-bold">{title}</div>
        {subtitle && <div className="mt-1 truncate text-xs opacity-80">{subtitle}</div>}
      </div>
    </div>
  );
};
