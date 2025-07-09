import { IconProps } from '../IconType';

export const ArrowLeftIcon = ({ size = 24, ...props }: IconProps) => (
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
      d="M11.285 9.117c.317-.3.317-.814 0-1.132l-5.46 5.778c-.512.542-.15 1.423.566 1.423h11.557c.745 0 1.107-.911.566-1.423l-5.779-5.46Z"
    />
  </svg>
);
