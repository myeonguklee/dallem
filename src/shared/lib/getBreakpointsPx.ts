const remToPx = (rem: string) => {
  const parsed = parseFloat(rem);
  const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  return !isNaN(parsed) ? parsed * rootFontSize : 0;
};

export const getBreakpointsPx = () => {
  const root = getComputedStyle(document.documentElement);

  return {
    mobile: remToPx(root.getPropertyValue('--breakpoint-mobile')),
    tablet: remToPx(root.getPropertyValue('--breakpoint-tablet')),
    web: remToPx(root.getPropertyValue('--breakpoint-web')),
    desktop: remToPx(root.getPropertyValue('--breakpoint-desktop')),
  };
};
