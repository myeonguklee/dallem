import { InputHTMLAttributes, forwardRef } from 'react';
import { type VariantProps, cva } from 'class-variance-authority';

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  errorMessage?: string;
}

const inputVariants = cva(
  'rounded-xl px-4 py-2.5 w-[460px] outline-none transition bg-gray-50', // figma에 따라 w-[460px]로 설정. 개발 진행에 따라 w-full로 변경할 수 있음.
  {
    variants: {
      variant: {
        default: 'text-gray-400',
        toggle: 'border border-gray-50 text-gray-400',
        hover: 'border-2 border-orange-300 text-gray-400',
        typing: 'border-2 border-orange-600 text-gray-800',
        done: 'border-2 border-gray-50 text-gray-800',
        error: 'border-2 border-red-600 text-gray-400',
        password_default: 'text-gray-400',
        password_off: 'text-gray-800',
        password_on: 'text-gray-800',
        password_error: 'border-2 border-red-600 text-gray-800',
      },
      hasIcon: {
        true: 'pr-10',
        false: '',
      },
      inputSize: {
        lg: 'text-base leading-6',
        sm: 'text-sm leading-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      hasIcon: false,
      inputSize: 'lg',
    },
  },
);

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, hasIcon, inputSize, errorMessage, ...props }, ref) => {
    return (
      <div className="space-y-1">
        <input
          ref={ref}
          className={`${inputVariants({ variant, hasIcon, inputSize })} ${className ?? ''}`.trim()}
          {...props}
        />
        {errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
