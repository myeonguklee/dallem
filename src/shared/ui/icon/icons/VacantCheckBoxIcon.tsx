import { IconProps } from '../IconType';

export const VacantCheckBoxIcon = ({ size = 24, ...props }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <rect
        width="17"
        height="17"
        x="3.5"
        y="3.5"
        fill="#fff"
        stroke="#E5E7EB"
        rx="5.5"
      />
    </svg>
  );
};
