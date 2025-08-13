import type { SVGProps } from 'react';

export const LandingUsersIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      cx="9"
      cy="8"
      r="4"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M2 20c0-3.3 3.6-6 8-6s8 2.7 8 6"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle
      cx="18"
      cy="7"
      r="3"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);
