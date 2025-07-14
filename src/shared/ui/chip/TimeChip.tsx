import type { HTMLAttributes, PropsWithChildren } from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import { clsx } from 'clsx';

const timeChipVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium h-8 min-w-[60px] px-2 text-sm',
  {
    variants: {
      variant: {
        available: 'bg-gray-50 text-gray-900 border border-gray-300',
        selected: 'bg-gray-900 text-white',
        disabled: 'bg-gray-200 text-gray-400 cursor-not-allowed',
      },
    },
    defaultVariants: {
      variant: 'available',
    },
  },
);

export interface TimeChipProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timeChipVariants> {}

export function TimeChip({
  className,
  variant = 'available',
  children,
  ...props
}: PropsWithChildren<TimeChipProps>) {
  return (
    <div
      className={clsx(timeChipVariants({ variant, className }))}
      {...props}
    >
      {children}
    </div>
  );
}
