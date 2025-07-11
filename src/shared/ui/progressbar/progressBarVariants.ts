import { cva } from 'class-variance-authority';

export const progressFill = cva('h-full transition-all duration-500 rounded-md', {
  variants: {
    state: {
      open: 'bg-orange-600',
      confirmed: 'bg-primary', // orange-500
      full: 'bg-orange-400',
    },
  },
});
