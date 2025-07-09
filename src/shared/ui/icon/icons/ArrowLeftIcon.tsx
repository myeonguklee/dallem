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
      d="M8.535 12.715a.824.824 0 0 1 0-1.132l5.46-5.778c.511-.542 1.422-.18 1.422.566v11.557c0 .745-.91 1.107-1.423.566l-5.46-5.779Z"
    />
  </svg>
);
