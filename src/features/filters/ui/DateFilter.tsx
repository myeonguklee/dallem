'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/shared/ui/button';
import { Calendar } from '@/shared/ui/calendar/Calendar';
import { filterButtonVariants } from '@/shared/ui/filter/variants';
import { ArrowDownIcon, ArrowUpIcon, WhiteArrowDownIcon } from '@/shared/ui/icon';

export const DateFilter = () => {
  const t = useTranslations('filters');
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedDateStr = searchParams.get('date');
  const selectedDate = selectedDateStr ? new Date(selectedDateStr) : undefined;
  const [calendarOpen, setCalendarOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const [tempDate, setTempDate] = useState<Date | undefined>(selectedDate);

  const isEnglish = pathname.startsWith('/en');
  const locale = isEnglish ? 'en-US' : 'ko-KR';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 클릭된 지점이 버튼과 팝업 모두의 바깥일 때만 닫히도록 함
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setCalendarOpen(false);
      }
    };

    // 팝업이 열려 있을 때만 이벤트 리스너를 등록
    if (calendarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // 클린업 함수: 컴포넌트가 언마운트되거나 isOpen이 변경될 때 리스너 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [calendarOpen]);

  const handleApplyDate = () => {
    if (tempDate) {
      const yyyyMMdd = tempDate.toISOString().slice(0, 10);
      const params = new URLSearchParams(searchParams);
      params.set('date', yyyyMMdd);
      router.push(`${pathname}?${params.toString()}`);
    }
    setCalendarOpen(false);
  };

  const handleResetDate = () => {
    setTempDate(undefined);
    const params = new URLSearchParams(searchParams);
    params.delete('date');
    router.push(`${pathname}?${params.toString()}`);
    setCalendarOpen(false);
  };

  const dateLabel = selectedDate
    ? selectedDate.toLocaleDateString(locale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : t('date.all', { default: '전체 날짜' });

  const calendarFooter = (
    <div className="mt-2 flex w-full gap-2">
      <Button
        variant="outline"
        onClick={handleResetDate}
        className="w-full"
      >
        {t('reset', { default: '초기화' })}
      </Button>
      <Button
        variant="primary"
        onClick={handleApplyDate}
        className="w-full"
      >
        {t('apply', { default: '적용' })}
      </Button>
    </div>
  );

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className={filterButtonVariants({
          variant: dateLabel === t('date.all', { default: '전체 날짜' }) ? 'all' : 'selected',
          className: 'flex min-w-[80px] items-center justify-between gap-1',
        })}
        onClick={() => {
          setCalendarOpen((prev) => !prev);
          setTempDate(selectedDate);
        }}
        ref={buttonRef}
      >
        {dateLabel}
        {calendarOpen ? (
          dateLabel === t('date.all', { default: '전체 날짜' }) ? (
            <ArrowUpIcon />
          ) : (
            <WhiteArrowDownIcon className="rotate-180" />
          )
        ) : dateLabel === t('date.all', { default: '전체 날짜' }) ? (
          <ArrowDownIcon />
        ) : (
          <WhiteArrowDownIcon />
        )}
      </button>
      {calendarOpen && (
        <div ref={popupRef}>
          <Calendar
            value={tempDate}
            onChange={setTempDate}
            footer={calendarFooter}
            className="absolute top-full left-0 z-50 mt-2 rounded-xl border border-gray-200 bg-white p-4 shadow-lg"
          />
        </div>
      )}
    </div>
  );
};
