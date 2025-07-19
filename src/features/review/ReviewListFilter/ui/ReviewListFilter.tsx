'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Calendar } from '@/shared/ui/calendar';
import { Filter } from '@/shared/ui/filter';
import { ArrowDownIcon } from '@/shared/ui/icon';

const locationFilter = [
  { label: '전체보기', value: 'all' },
  { label: '건대입구', value: '건대입구' },
  { label: '을지로3가', value: '을지로3가' },
  { label: '신림', value: '신림' },
  { label: '홍대입구', value: '홍대입구' },
];

export const ReviewListFilter = () => {
  const [selected, setSelected] = useState('all');
  const [value, setValue] = useState<Date | undefined>();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className="relative flex items-center gap-2">
        <Filter
          options={locationFilter}
          selected={selected}
          onChange={setSelected}
          allValue="all"
        />
        <div className="relative">
          <Button
            variant={'outline'}
            onClick={handleOpenChange}
            className="flx items-center justify-center"
          >
            {value ? value.toLocaleDateString() : '날짜 선택'}

            <span className="ml-1">{value ? '' : <ArrowDownIcon />}</span>
          </Button>
          {isOpen && (
            <div className="tablet:left-0 tablet:translate-x-0 absolute top-full left-1/2 z-[9999] mt-2 -translate-x-1/2">
              <Calendar
                value={value}
                onChange={(date: Date | undefined) => setValue(date)}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
