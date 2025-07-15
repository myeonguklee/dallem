import { TextareaHTMLAttributes } from 'react';
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const textareaVariants = cva(
  'rounded-[12px] bg-gray-50 text-gray-400 resize-none overflow-auto focus:outline-none focus:ring-2 focus:ring-orange-200',
  {
    variants: {
      size: {
        medium: 'w-[471px] h-[120px] px-4 py-2.5',
        large: 'w-[600px] h-[160px] px-5 py-3', // 예시로 large도 추가
      },
      state: {
        default: '',
        disabled: 'bg-gray-100 text-gray-300 cursor-not-allowed',
      },
    },
    defaultVariants: {
      size: 'medium',
      state: 'default',
    },
  },
);

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof textareaVariants>;

export const InputTextarea = ({ className, size, state, disabled, ...props }: TextareaProps) => (
  <textarea
    className={twMerge(textareaVariants({ size, state }), className)}
    disabled={disabled ?? state === 'disabled'}
    {...props}
  />
);
