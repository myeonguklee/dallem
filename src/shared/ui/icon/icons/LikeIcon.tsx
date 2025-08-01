import { IconProps } from '../IconType';

export const LikeIcon = ({ size = 48, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 48 48"
    {...props}
  >
    <circle
      cx="24"
      cy="24"
      r="24"
      fill="#FFF7ED"
    />
    <path
      fill="#EA580C"
      stroke="#EA580C"
      strokeWidth="2"
      d="m16.45 25.908 6.953 6.532c.24.224.36.337.5.365a.5.5 0 0 0 .193 0c.142-.028.261-.14.5-.365l6.953-6.532a5.203 5.203 0 0 0 .549-6.982l-.31-.399c-1.968-2.536-5.918-2.111-7.301.787a.54.54 0 0 1-.974 0c-1.383-2.898-5.333-3.323-7.302-.787l-.309.4a5.203 5.203 0 0 0 .549 6.981Z"
    />
  </svg>
);
