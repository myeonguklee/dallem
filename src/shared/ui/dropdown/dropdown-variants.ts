import { cva } from 'class-variance-authority';

export const dropdownTriggerVariants = cva(
  'flex items-center justify-between gap-2.5 rounded cursor-pointer transition-colors text-left w-[472px] text-gray-800',
  {
    variants: {
      size: {
        large: 'h-11 px-4 py-2.5 text-base font-medium',
        small: 'h-10 px-4 py-2 text-sm font-medium',
      },
      state: {
        default: 'bg-gray-50',
        hover: 'bg-gray-200',
        selected: 'bg-orange-100',
      },
    },
    defaultVariants: {
      size: 'large',
      state: 'default',
    },
  },
);
export const dropdownItemVariants = cva(
  'flex items-center justify-between gap-2.5 rounded cursor-pointer transition-colors text-left w-[472px] text-gray-800',
  {
    variants: {
      state: {
        default: 'bg-white text-gray-900',
        hover: 'bg-gray-50',
        selected: 'bg-orange-50 text-orange-600',
      },
      size: {
        large: 'h-11 px-4 py-2.5 text-base font-medium',
        small: 'h-10 px-4 py-2 text-sm font-medium',
      },
    },
    defaultVariants: {
      size: 'large',
      state: 'default',
    },
  },
);
