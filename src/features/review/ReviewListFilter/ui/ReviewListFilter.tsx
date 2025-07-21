'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/shared/lib';
import { formatDateTypeYYYYMMDD } from '@/shared/lib/dateFormatter';
import { Calendar } from '@/shared/ui/calendar';
import { Filter } from '@/shared/ui/filter';
import { ArrowDownIcon } from '@/shared/ui/icon';

export const ReviewListFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // i18n 문자 변환
  const t = useTranslations('pages.reviews');
  const locationFilter = [
    { label: t('allList'), value: 'all' },
    { label: t('locationKonkuk'), value: '건대입구' },
    { label: t('euljiro'), value: '을지로3가' },
    { label: t('sillim'), value: '신림' },
    { label: t('hongik'), value: '홍대입구' },
  ];

  // URL에서 현재 값들 가져오기
  const activeLocation = searchParams.get('location') || 'all';
  const activeDate = searchParams.get('date');

  const [value, setValue] = useState<Date | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // URL의 date를 초기값으로 설정
  useEffect(() => {
    if (activeDate) {
      setValue(new Date(activeDate));
    }
  }, [activeDate]);

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
            {value ? value.toLocaleDateString() : t('selectDate')}
            <span className="ml-1">{value ? '' : <ArrowDownIcon />}</span>
          </button>
          {/* 캘린더: 날짜 선택 */}
          {isOpen && (
            <div
              className={cn(
                'absolute z-50 mt-2 shadow-lg', // 기본 스타일

                // 모바일: 버튼 아래 중앙
                'left-1/2 -translate-x-1/2',

                // 태블릿: 버튼 아래 왼쪽 정렬
                'tablet:left-0 tablet:translate-x-0',
              )}
            >
              <Calendar
                value={value}
                onChange={handleDateChange}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
