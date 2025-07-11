import type { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import { clsx } from 'clsx';

export interface ChipProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {}

export const Chip: FC<PropsWithChildren<ChipProps>> = ({
  className,
  active,
  size = 'sm',
  children,
  ...props
}) => {
  return (
    <div
      className={clsx(chipVariants({ active, size }), className)}
      {...props}
    >
      {children}
    </div>
  );
};

const chipVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium text-base px-4 h-9',
  {
    variants: {
      active: {
        true: 'bg-gray-900 text-white',
        false: 'bg-gray-200 text-gray-900',
      },
      size: {
        lg: 'h-[40px] px-4 py-[10px]', // 좌우 16px, 상하 10px
        sm: 'h-[36px] px-3 py-2', // 좌우 12px, 상하 8px
      },
    },
    defaultVariants: {
      active: false,
      size: 'sm',
    },
  },
);
