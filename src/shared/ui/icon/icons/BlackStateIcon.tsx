import { IconProps } from '../IconType';

export const BlackStateIcon = ({ size = 24, ...props }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        stroke="#111827"
        strokeLinecap="round"
        strokeWidth="1.8"
        d="m3 11 4-4m0 0 4 4M7 7v10M21 13l-4 4m0 0-4-4m4 4V7"
      />
    </svg>
  );
};
