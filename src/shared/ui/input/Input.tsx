import { InputHTMLAttributes, forwardRef } from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import { VisibilityOffIcon, VisibilityOnIcon } from '../icon';

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  errorMessage?: string;
}

export const INPUT_VARIANT = {
  default: 'text-gray-800',
  toggle: 'border border-gray-50 text-gray-800', // dropdown 완성 후 추가 개발
  hover: 'border-2 border-orange-300 text-gray-800',
  typing: 'border-2 border-orange-600 text-gray-800',
  done: 'border-2 border-gray-50 text-gray-800',
  error: 'border-2 border-red-600 text-gray-800',
  password_default: 'text-gray-800',
  password_off: 'text-gray-800',
  password_on: 'text-gray-800',
  password_error: 'border-2 border-red-600 text-gray-800',
};

export const inputVariants = cva(
  'flex w-full rounded-xl px-4 py-2.5 outline-none transition bg-gray-50 text-sm leading-5 tablet:text-base tablet:leading-6',
  {
    variants: {
      variant: INPUT_VARIANT,
      inputSize: {
        lg: 'text-base leading-6',
        sm: 'text-sm leading-5',
      },
      isError: {
        true: 'border-2 border-red-600 text-gray-800',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'lg',
      isError: false,
    },
  },
);

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant, inputSize, isError, errorMessage, ...props }, ref) => {
    return (
      // figma에 따라 w-[460px]로 설정. 개발 진행에 따라 w-full로 변경할 수 있음.
      <>
        <div className={`${inputVariants({ variant, inputSize, isError })}`}>
          <input
            ref={ref}
            className="flex-1 outline-none"
            {...props}
          />
          {/* toggle 버전 dropdown 완성 후 작성 예정 */}
          {(variant === 'password_default' || variant === 'password_on') && (
            <div className="shrink-0">
              <VisibilityOnIcon />
            </div>
          )}
          {(variant === 'password_off' || variant === 'password_error') && (
            <div className="shrink-0">
              <VisibilityOffIcon />
            </div>
          )}
        </div>
        {errorMessage && <p className="pt-[8px] text-xs text-red-500">{errorMessage}</p>}
      </>
    );
  },
);

Input.displayName = 'Input';
