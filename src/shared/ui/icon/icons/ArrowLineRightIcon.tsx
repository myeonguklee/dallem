import { IconProps } from '../IconType';

export const ArrowLineRightIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#F97316"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 12h15.5m0 0L11 3.5m8.5 8.5L11 20.5"
    />
  </svg>
);
