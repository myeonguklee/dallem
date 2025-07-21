'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Sort } from '@/shared/ui/sort';

const ReviewSortList = [
  { label: '최신 순', value: 'createdAt' },
  { label: '리뷰 높은 순', value: 'score' },
  { label: '참여 인원 순', value: 'participantCount' },
];

export const ReviewSort = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeType = searchParams.get('sortBy') || 'createdAt';

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === 'createdAt') {
      params.delete('sortBy');
    } else {
      params.set('sortBy', value);
    }

    params.set('offset', '0'); // 필터 변경시 첫 페이지로
    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <div className="">
        <Sort
          options={ReviewSortList}
          selected={activeType}
          onChange={handleSortChange}
        />
      </div>
    </>
  );
};
