export const OPEN = 'open';
export const CONFIRMED = 'confirmed';
export const FULL = 'full';

export type ProgressState = typeof OPEN | typeof CONFIRMED | typeof FULL;
