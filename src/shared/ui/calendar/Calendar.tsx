import { DayPicker } from 'react-day-picker';

export interface CalendarProps {
  value?: Date; // 선택된 날짜
  onChange: (date: Date | undefined) => void; // 날짜 변경 핸들러
  footer?: React.ReactNode; // 하단 푸터 컴포넌트
  startMonth?: Date; // 달력이 시작되는 월 (기본값: 2025-01-01)
  disabled?: boolean; // 전체 달력 비활성화 여부
  className?: string; // 추가 CSS 클래스
}

export const Calendar = ({
  value,
  onChange,
  footer,
  startMonth = new Date('2025-01-01'),
  disabled = false,
  className = '',
}: CalendarProps) => {
  return (
    <DayPicker
      mode="single" // 단일 날짜 선택 모드
      selected={value} // 선택된 날짜
      onSelect={onChange} // 날짜 선택 핸들러
      disabled={disabled} // 비활성화 여부
      startMonth={startMonth} // 시작 월
      classNames={{
        // 전체 컨테이너 스타일
        root: `shadow-lg p-4 rounded-xl bg-white ${className}`,
        // 월/년도 캡션 스타일 (상단 중앙)
        month_caption:
          'text-xl font-bold text-gray-900 mb-4 text-center absolute top-4 left-1/2 -translate-x-1/2',
        // 월 그리드 컨테이너
        month_grid: 'w-full',
        // 요일 헤더 행 (월~일)
        weekdays: 'flex w-full mb-2',
        // 개별 요일 헤더
        weekday: 'flex-1 text-center text-sm font-medium text-gray-700 p-2',
        // 주 행
        week: 'flex w-full',
        // 날짜 셀 컨테이너
        day: 'flex-1 flex justify-center items-center p-1 text-gray-700',
        // 날짜 버튼 (클릭 가능한 날짜)
        day_button:
          'h-9 w-9 p-0 font-normal rounded-md transition-colors hover:bg-orange-500 hover:text-white aria-selected:hover:bg-orange-500 flex items-center justify-center text-sm',
        // 오늘 날짜 스타일
        today: 'border-2 border-orange-500 text-orange-600 font-semibold',
        // 비활성화된 날짜 스타일
        disabled: 'text-gray-300 opacity-50 cursor-not-allowed',
        // 네비게이션 컨테이너 (이전/다음 버튼)
        nav: ' flex items-center justify-between mb-4',
        // 이전 월 버튼
        button_previous:
          'h-8 w-8 flex items-center justify-center rounded-md hover:bg-orange-100 text-orange-500 transition-colors',
        // 다음 월 버튼
        button_next:
          'h-8 w-8 flex items-center justify-center rounded-md hover:bg-orange-100 text-orange-500 transition-colors',
        // 화살표 아이콘
        chevron: 'fill-current w-4 h-4',
        // 푸터 컨테이너
        footer: 'pt-1 mt-3',
      }}
      modifiersClassNames={{
        // 선택된 날짜 스타일
        selected: 'bg-orange-500 text-white rounded-md',
        // 현재 월이 아닌 날짜 스타일 (회색)
        outside: 'text-gray-200',
      }}
      footer={footer} // 커스텀 푸터 컴포넌트
    />
  );
};
