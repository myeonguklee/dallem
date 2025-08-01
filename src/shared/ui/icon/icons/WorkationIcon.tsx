import { IconProps } from '../IconType';

export const WorkationIcon = ({ size = 32, ...props }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 32 32"
      {...props}
    >
      <path
        fill="currentColor"
        d="M15.5 22.5c5.799 0 10.5 2.739 10.5 5.5H5c0-2.761 4.701-5.5 10.5-5.5Z"
      />
      <rect
        width="1"
        height="9.526"
        x="11.059"
        y="14.893"
        fill="currentColor"
        rx=".5"
        transform="rotate(-16.685 11.059 14.893)"
      />
      <rect
        width="1"
        height="1.496"
        x="9"
        y="9.287"
        fill="currentColor"
        rx=".5"
        transform="rotate(-16.685 9 9.287)"
      />
      <path
        fill="currentColor"
        d="M10 10c-4.282 1.142-5.423 5.407-5.423 8.726 0 1.202 1.367 1.386 1.905.31.297-.594.986-.88 1.617-.67l.564.188a2.021 2.021 0 0 0 2.217-.654l.201-.252a2.109 2.109 0 0 1 2.314-.683l.321.107c.75.25 1.573-.054 1.98-.732l.117-.195a1.443 1.443 0 0 1 1.882-.548c1.102.552 2.16-.396 1.484-1.426C17.47 11.56 14.288 8.857 10 10Z"
      />
      <circle
        cx="24.5"
        cy="8"
        r="3.5"
        fill="currentColor"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        d="M19.75 8h-1M30 8h-1M21.105 11.27l-.707.707M28.352 4.022l-.707.707M21.105 4.73l-.707-.708M28.352 11.978l-.707-.707M24.375 12.625v1M24.375 2.375v1"
      />
    </svg>
  );
};
