'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n';
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
  const popupRef = useRef<HTMLDivElement>(null);

  // URL의 date를 초기값으로 설정
  useEffect(() => {
    if (activeDate) {
      setValue(new Date(activeDate));
    }
  }, [activeDate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 클릭된 지점이 버튼과 팝업 모두의 바깥일 때만 닫히도록 함
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // 팝업이 열려 있을 때만 이벤트 리스너를 등록
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // 클린업 함수: 컴포넌트가 언마운트되거나 isOpen이 변경될 때 리스너 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
    router.push({
      pathname: '/gathering',
      query: Object.fromEntries(params.entries()),
    });
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
    router.push({
      pathname: '/gathering',
      query: Object.fromEntries(params.entries()),
    });
  };

  return (
    <>
      <div className="flex items-center gap-2">
        {/* 지역 필터링 */}
        <Filter
          options={locationFilter}
          selected={activeLocation}
          onChange={handleLocationChange}
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
                'absolute z-50 mt-2 shadow-lg',

                // 모바일: 버튼 아래 중앙
                'left-1/2 -translate-x-1/2',

                // 태블릿: 버튼 아래 왼쪽 정렬
                'tablet:left-0 tablet:translate-x-0',
              )}
              ref={popupRef}
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
