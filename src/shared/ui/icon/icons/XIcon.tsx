import { IconProps } from '../IconType';

export const XIcon = ({ size = 24, ...props }: IconProps) => {
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
        d="m5 5 14.5 14.5M19.5 5 5 19.5"
      />
    </svg>
  );
};
