import { type VariantProps, cva } from 'class-variance-authority';

// 정렬 버튼 variants
export const sortButtonVariants = cva(
  'flex items-center justify-center rounded-[var(--dimension-button-rounded)] border border-gray-200 bg-white',
  {
    variants: {
      size: {
        default: 'h-9 w-9 md:h-10 md:min-w-32 md:justify-start md:gap-1 md:p-2',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

// 정렬 옵션 variants
export const sortOptionVariants = cva(
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
export type SortButtonVariants = VariantProps<typeof sortButtonVariants>;
export type SortOptionVariants = VariantProps<typeof sortOptionVariants>;
