import { IconProps } from '../IconType';

export const CheckCircleIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <rect
      width="18"
      height="18"
      x="3"
      y="3"
      fill="#fff"
      rx="6"
    />
    <path
      stroke="#EA580C"
      strokeLinecap="round"
      strokeWidth="2"
      d="m7 11.625 3.11 3.11a.375.375 0 0 0 .53 0L16.375 9"
    />
  </svg>
);
