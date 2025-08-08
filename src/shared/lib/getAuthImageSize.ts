import { getBreakpointsPx } from '@/shared/lib/getBreakpointsPx';

export const IMAGE_SIZE_BY_BREAKPOINTS = {
  mobile: 290,
  tablet: 407,
  web: 588,
} as const;

export const getAuthImageSize = (width: number): number => {
  const breakpoints = getBreakpointsPx();

  if (width < breakpoints.tablet) return IMAGE_SIZE_BY_BREAKPOINTS.mobile;
  if (width < breakpoints.web) return IMAGE_SIZE_BY_BREAKPOINTS.tablet;
  return IMAGE_SIZE_BY_BREAKPOINTS.web;
};
