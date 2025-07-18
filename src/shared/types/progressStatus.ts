export const PROGRESS_STATE = {
  OPEN: 'open',
  CONFIRMED: 'confirmed',
  FULL: 'full',
} as const;

export type ProgressState = (typeof PROGRESS_STATE)[keyof typeof PROGRESS_STATE];
