import type { HTMLAttributes } from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import { clsx } from 'clsx';

export interface InfoChipProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof infoChipVariants> {
  info: string;
}

const infoChipVariants = cva(
  'inline-flex items-center justify-center rounded-lg px-4 h-9 text-sm font-medium',
  {
    variants: {
      variant: {
        default: 'bg-gray-900 text-white',
        time: 'bg-gray-900 text-orange-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export const InfoChip = ({ className, variant = 'default', info, ...props }: InfoChipProps) => {
  return (
    <div
      className={clsx(infoChipVariants({ variant, className }))}
      {...props}
    >
      {info}
    </div>
  );
};
