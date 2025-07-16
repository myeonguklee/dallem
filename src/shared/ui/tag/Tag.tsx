import { HTMLAttributes } from 'react';
import { cn } from '@/shared/lib';
import { AlarmIcon } from '@/shared/ui/icon';
import { VariantProps, cva } from 'class-variance-authority';

interface TagProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  borderRadius?: TagBorderRadius;
  tagColor?: TagColor;
  tagSize?: TagSize;
  icon?: React.ReactNode;
}

const tagVariants = cva('inline-flex justify-center items-center gap-1 font-medium', {
  variants: {
    tagColor: {
      primary: 'bg-[var(--color-primary)] text-white',
      secondary: 'bg-orange-400 text-white',
      tertiary: 'bg-orange-300 text-white',
      // 추가 색상들
      red: 'bg-red-500 text-white',
      green: 'bg-green-500 text-white',
      blue: 'bg-blue-500 text-white',
      gray: 'bg-gray-500 text-white',
    },
    tagSize: {
      sm: 'h-6 text-xs',
      md: 'h-8 text-sm',
      lg: 'h-10 text-base',
    },
    borderRadius: {
      square: 'rounded-bl-xl rounded-tr-lg tablet:rounded-tr-none',
      rounded: 'rounded-bl-xl rounded-tr-lg',
      full: 'rounded-full',
    },
  },
  defaultVariants: {
    tagColor: 'primary',
    tagSize: 'md',
    borderRadius: 'square',
  },
});

export type TagColor = VariantProps<typeof tagVariants>['tagColor'];
export type TagSize = VariantProps<typeof tagVariants>['tagSize'];
export type TagBorderRadius = VariantProps<typeof tagVariants>['borderRadius'];

export const Tag = ({
  children,
  tagColor,
  tagSize,
  borderRadius,
  icon,
  className,
  ...props
}: TagProps) => {
  return (
    <div
      className={cn(tagVariants({ tagColor, tagSize, borderRadius }), 'w-30', className)}
      {...props}
    >
      {icon || <AlarmIcon />}
      <span>{children}</span>
    </div>
  );
};
