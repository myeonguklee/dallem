import { IconProps } from '../IconType';

export const CheckBoxIcon = ({ size = 16, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      stroke="#F97316"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      d="m4 7.246 3.088 3.087L12.42 5"
    />
  </svg>
);
