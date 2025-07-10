import { ButtonProps } from './ButtonType';

export const Button = ({
  children,
  variant = 'primary',
  className = '',
  disabled = false,
  ...props
}: ButtonProps) => {
  const base =
    'rounded-[var(--radius-common)] flex items-center justify-center transition-colors py-3 px-8 h-11 font-base';

  const variantsClass = {
    primary: 'bg-[var(--color-primary)] text-white hover:bg-orange-600',
    outline:
      'border border-[var(--color-primary)] bg-white text-[var(--color-primary)] hover:bg-orange-600 hover:text-white ',
    default: 'bg-gray-500 text-white hover:bg-gray-600',
  };

  const disabledStyles = 'bg-[var(--color-font-secondary)] cursor-not-allowed';

  const combinedClasses = [
    base,
    variantsClass[variant],
    disabled ? disabledStyles : 'cursor-pointer',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      {...props}
      disabled={disabled}
      type="button"
      className={combinedClasses}
    >
      {children}
    </button>
  );
};
