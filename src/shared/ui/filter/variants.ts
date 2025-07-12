import { type VariantProps, cva } from 'class-variance-authority';

// 필터 버튼 variants
export const filterButtonVariants = cva(
  'flex h-10 min-w-32 items-center justify-center gap-2 rounded-[var(--dimension-button-rounded)] border border-gray-200 p-2 transition-colors',
  {
    variants: {
      variant: {
        all: 'bg-white text-[var(--color-font-base)]',
        selected: 'bg-black text-white',
      },
    },
    defaultVariants: {
      variant: 'all',
    },
  },
);

// 필터 옵션 variants
export const filterOptionVariants = cva(
  'w-full px-2 py-3 text-left first:rounded-t-lg last:rounded-b-lg hover:bg-orange-200',
  {
    variants: {
      selected: {
        true: 'font-bold text-[var(--semantic-color-primary)]',
        false: 'text-[var(--color-font-base)]',
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
);

// 타입 추출
export type FilterButtonVariants = VariantProps<typeof filterButtonVariants>;
export type FilterOptionVariants = VariantProps<typeof filterOptionVariants>;
