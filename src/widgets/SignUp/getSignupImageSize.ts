import { getBreakpointsPx } from '@/lib/getBreakpointsPx';

const IMAGE_SIZE_BY_BREAKPOINTS = {
  mobile: 290, // 23.4375rem
  tablet: 407, // 46.5rem
  web: 588, // 75rem
} as const;

export const getSignupImageSize = (width: number): number => {
  const breakpoints = getBreakpointsPx();

  if (width < breakpoints.tablet) return IMAGE_SIZE_BY_BREAKPOINTS.mobile;
  if (width < breakpoints.web) return IMAGE_SIZE_BY_BREAKPOINTS.tablet;
  return IMAGE_SIZE_BY_BREAKPOINTS.web;
};
