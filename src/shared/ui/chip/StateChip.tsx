import type { HTMLAttributes, PropsWithChildren } from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { CheckBoxIcon } from '../icon/icons/CheckBoxIcon';

const stateChipVariants = cva(
  'inline-flex items-center justify-center gap-x-1.5 rounded-full px-3 h-8 text-sm font-medium transition-colors',
  {
    variants: {
      variant: {
        scheduled: 'bg-orange-100 text-orange-600', // 이용 예정
        completed: 'bg-gray-200 text-gray-500', // 이용 완료
        confirmed: 'bg-white text-orange-500 border border-orange-100', // 개설확정
        pending: 'bg-white text-gray-500 border border-gray-200', // 개설대기
      },
    },

    defaultVariants: {
      variant: 'pending',
    },
  },
);

export interface StateChipProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stateChipVariants> {}

export const StateChip = ({
  className,
  variant,
  children,
  ...props
}: PropsWithChildren<StateChipProps>) => {
  const renderIcon = () => {
    if (variant === 'confirmed') {
      return <CheckBoxIcon />;
    }

    return null;
  };

  return (
    <div
      className={clsx(stateChipVariants({ variant }), className)}
      {...props}
    >
      {renderIcon()}
      <span>{children}</span>
    </div>
  );
};
