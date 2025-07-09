import { IconProps } from '../IconType';

export const EditIcon = ({ size = 32, ...props }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 32 32"
      {...props}
    >
      <circle
        cx="16"
        cy="16"
        r="15"
        fill="#E5E7EB"
        stroke="#E5E7EB"
        strokeWidth="2"
      />
      <path
        fill="#9CA3AF"
        d="M16.02 9.226a.796.796 0 0 1 1.062-.386l3.443 1.614c.4.187.574.664.388 1.065l-4.767 10.277a.797.797 0 0 1-.458.417l-2.505.881a.8.8 0 0 1-1.013-.475l-.939-2.495a.804.804 0 0 1 .023-.621l4.767-10.277Z"
      />
      <path
        stroke="#E5E7EB"
        d="m12.667 9.566 9.535 4.474"
      />
    </svg>
  );
};
