'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Pagination } from '@/shared/ui/pagination';

export default function Review() {
  const [currentPage, setCurrentPage] = useState(1); // ✅ 상태 선언

  const handlePageChange = (page: number) => {
    console.log('페이지 바뀜:', page);
    setCurrentPage(page);
  };
  return (
    <>
      <Button
        variant="ghost"
        className="w-full"
        isActive
      >
        함수{' '}
      </Button>
      <Pagination
        totalPages={15} // 전체 페이지 수 (계산됨)
        currentPage={currentPage} // 현재 페이지 번호 (상태)
        onPageChange={handlePageChange} // 페이지 변경 콜백
      />
    </>
  );
}
