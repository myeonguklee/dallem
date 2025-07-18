import { TextareaHTMLAttributes } from 'react';
import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

export const textareaVariants = cva(
  'w-[471px] h-[120px] px-4 py-2.5 rounded-[12px] bg-gray-50 text-gray-800 placeholder-gray-400 resize-none overflow-auto focus:outline-none focus:ring-2 focus:ring-orange-200',
  {
    variants: {
      state: {
        default: '',
        disabled: 'bg-gray-100 text-gray-300 cursor-not-allowed',
      },
    },
    defaultVariants: {
      state: 'default',
    },
  },
);

type textareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof textareaVariants>;

export const InputTextarea = ({ className, state, disabled, ...props }: textareaProps) => (
  <textarea
    className={twMerge(textareaVariants({ state }), className)}
    disabled={disabled ?? state === 'disabled'}
    {...props}
  />
);
