import { IconProps } from '../IconType';

export const StarIcon = ({
  size = 22,
  filled = false,
  onClick,
  className = '',
  ...props
}: IconProps) => {
  return (
    <svg
      role="img"
      aria-label={filled ? 'filled-star' : 'empty-star'}
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      onClick={onClick}
      className={className}
      {...props}
    >
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={filled ? '#f97316' : '#F3F4F6'}
        stroke="#E5E7EB"
        strokeWidth="1"
      />
    </svg>
  );
};
