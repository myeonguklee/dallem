import { IconProps } from '../IconType';

export const LanguageIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      d="M2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.9999 2.0498C12.9999 2.0498 15.9999 5.9998 15.9999 11.9998C15.9999 17.9998 12.9999 21.9498 12.9999 21.9498M10.9999 21.9498C10.9999 21.9498 7.99988 17.9998 7.99988 11.9998C7.99988 5.9998 10.9999 2.0498 10.9999 2.0498M2.62988 15.4998H21.3699M2.62988 8.4998H21.3699"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
