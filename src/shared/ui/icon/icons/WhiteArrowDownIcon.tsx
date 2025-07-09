import { IconProps } from '../IconType';

export const WhiteArrowDownIcon = ({ size = 24, ...props }: IconProps) => {
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
        fill="#F9FAFB"
        d="M12.715 15.465c-.317.3-.814.3-1.132 0l-5.778-5.459c-.542-.512-.18-1.423.566-1.423h11.557c.745 0 1.107.911.566 1.423l-5.779 5.46Z"
      />
    </svg>
  );
};
