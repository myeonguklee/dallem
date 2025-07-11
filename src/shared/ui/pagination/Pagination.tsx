import { Button } from '../button';
import { ArrowLeftIcon, ArrowRightIcon } from '../icon';

export interface PaginationProps {
  totalPages: number; // 전체 페이지 수
  currentPage: number; // 현재 선택된 페이지 (0부터 시작)
  onPageChange: (page: number) => void; // 페이지 클릭 시 콜백
  className?: string;
  disabled?: boolean; // 전체 비활성화 상태
}

export const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  disabled = false,
  // className,
}: PaginationProps) => {
  return (
    <>
      <div className="">
        <div className="flex">
          <Button
            variant="ghost"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1 || disabled}
          >
            <ArrowLeftIcon />
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={'ghost'}
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          ))}

          <Button
            variant="ghost"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || disabled}
          >
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </>
  );
};
