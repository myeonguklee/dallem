import { PROGRESS_STATE } from '@/shared/types/progressStatus';
import { cva } from 'class-variance-authority';

export const progressFill = cva('h-full transition-all duration-500 rounded-md', {
  variants: {
    state: {
      [PROGRESS_STATE.OPEN]: 'bg-orange-600',
      [PROGRESS_STATE.CONFIRMED]: 'bg-primary', // orange-500
      [PROGRESS_STATE.FULL]: 'bg-orange-400',
    },
  },
});
