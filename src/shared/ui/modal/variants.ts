import { VariantProps, cva } from 'class-variance-authority';

export const modalVariants = cva(
  'relative bg-white rounded-xl w-full mx-4 max-w-[520px] shadow-2xl transform transition-all duration-300',
  {
    variants: {
      variant: {
        // 확인/취소 팝업 - 작고 간단한 스타일
        dialog: 'p-6 text-center',
        // 폼 모달 - 더 넓고 왼쪽 정렬
        form: 'p-4 text-left',
        // 일반 모달 - 기본 스타일
        default: 'p-8 text-center',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type ModalVariantProps = VariantProps<typeof modalVariants>;
