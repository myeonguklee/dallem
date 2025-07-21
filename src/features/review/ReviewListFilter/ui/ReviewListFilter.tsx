'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { formatDateTypeYYYYMMDD } from '@/shared/lib/dateFormatter';
// import { Button } from '@/shared/ui/button';
import { Filter } from '@/shared/ui/filter';
import { ArrowDownIcon } from '@/shared/ui/icon';
import { CalenderPopup } from '@/shared/ui/modal/CalendarPopup';

const locationFilter = [
  { label: '전체보기', value: 'all' },
  { label: '건대입구', value: '건대입구' },
  { label: '을지로3가', value: '을지로3가' },
  { label: '신림', value: '신림' },
  { label: '홍대입구', value: '홍대입구' },
];

export const ReviewListFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL에서 현재 값들 가져오기
  const activeLocation = searchParams.get('location') || 'all';
  const activeDate = searchParams.get('date');

  const [value, setValue] = useState<Date | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  // URL의 date를 초기값으로 설정
  useEffect(() => {
    if (activeDate) {
      setValue(new Date(activeDate));
    }
  }, [activeDate]);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [isOpen]);

  const handleOpenChange = () => {
    setIsOpen((prev) => !prev);
  };

  // 지역 필터 변경
  const handleLocationChange = (location: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (location === 'all') {
      params.delete('location');
    } else {
      params.set('location', location);
    }

    params.set('offset', '0');
    router.push(`?${params.toString()}`);
  };

  // 날짜 필터 변경
  const handleDateChange = (date: Date | undefined) => {
    setValue(date);
    setIsOpen(false);

    const params = new URLSearchParams(searchParams.toString());

    if (date) {
      // YYYY-MM-DD 형식으로 저장
      params.set('date', formatDateTypeYYYYMMDD(date));
    } else {
      params.delete('date');
    }

    params.set('offset', '0');
    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        {/* 지역 필터링 */}
        <Filter
          options={locationFilter}
          selected={activeLocation}
          onChange={handleLocationChange} // 지역 전용 핸들러
          allValue="all"
        />

        <div className="relative">
          <button
            onClick={handleOpenChange}
            className="flex items-center justify-center rounded-[var(--radius-button)] border border-[var(--color-primary)] bg-white px-6 py-2 text-[var(--color-primary)] hover:bg-orange-600 hover:text-white"
            ref={buttonRef}
          >
            {value ? value.toLocaleDateString() : '날짜 선택'}
            <span className="ml-1">{value ? '' : <ArrowDownIcon />}</span>
          </button>
          {/* 캘린더: 날짜 선택 */}
          {isOpen && (
            <div className="absolute top-full left-0 z-50 mt-2">
              <CalenderPopup
                value={value}
                onChange={handleDateChange}
                position={position}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
