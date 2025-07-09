import { IconProps } from '../IconType';

export const CheckIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle
      cx="12"
      cy="12"
      r="9"
      fill="#F97316"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      d="m8.5 11.825 2.509 2.508L15.342 10"
    />
  </svg>
);
