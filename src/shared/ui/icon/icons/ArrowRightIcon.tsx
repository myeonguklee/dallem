import { IconProps } from '../IconType';

export const ArrowRightIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#1F2937"
      d="M14.883 12.715c.3-.317.3-.814 0-1.132l-5.46-5.778C8.911 5.263 8 5.625 8 6.37v11.557c0 .745.911 1.107 1.423.566l5.46-5.779Z"
    />
  </svg>
);
