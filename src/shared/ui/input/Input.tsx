import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error = false, ...props }, ref) => {
    const baseClass =
      'w-full rounded-xl border-2 px-[16px] py-[10px] shadow-sm outline-2 transition-colors duration-75 bg-gray-50';
    const normalClass = 'border-secondary-50 hover:border-primary-300 focus:outline-primary-600';
    const errorClass = 'border-red-600';

    return (
      <input
        ref={ref}
        className={`${baseClass} ${error ? errorClass : normalClass} ${className}`}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export default Input;
