'use client';

import { useState } from 'react';
import { Sort } from '@/shared/ui/sort';

const ReviewSortList = [
  { label: '최신 순', value: 'createdAt' },
  { label: '리뷰 높은 순', value: 'score' },
  { label: '참여 인원 순', value: 'participantCount' },
];

export const ReviewSort = () => {
  const [selected, setSelected] = useState(ReviewSortList[0].value);
  return (
    <>
      <div className="">
        <Sort
          options={ReviewSortList}
          selected={selected}
          onChange={setSelected}
        />
      </div>
    </>
  );
};
