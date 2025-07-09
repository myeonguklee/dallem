import { IconProps } from '../IconType';

export const HeartBoxIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#EA580C"
      d="M22.1 9.1C22 5.7 19.3 3 15.9 3c-1.1 0-2.8.8-3.5 2.1-.1.3-.5.3-.6 0-.8-1.2-2.4-2-3.6-2-3.3 0-6.1 2.7-6.2 6v.2c0 1.7.7 3.3 1.9 4.5v.1c.1.1 4.9 4.3 7.1 6.2.6.5 1.5.5 2.1 0 2.2-1.9 6.9-6.1 7.1-6.2v-.1c1.2-1.1 1.9-2.7 1.9-4.5v-.2Z"
    />
  </svg>
);
