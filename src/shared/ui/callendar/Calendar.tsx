import { useState } from 'react';
import { DayPicker } from 'react-day-picker';

export const Calendar = () => {
  const [selected, setSelected] = useState<Date | undefined>();

  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={(date) => setSelected(date)}
      startMonth={new Date('2025-01-01')}
      classNames={{
        root: 'shadow-lg p-4 rounded-xl bg-white border relative',
        month_caption:
          'text-xl font-bold text-gray-900 mb-4 text-center absolute top-4 left-1/2 -translate-x-1/2',
        month_grid: 'w-full',
        weekdays: 'flex w-full mb-2', // 월요일 부터 일요일까지
        weekday: 'flex-1 text-center text-sm font-medium text-gray-700 p-2',
        week: 'flex w-full',
        day: 'flex-1 flex justify-center items-center p-1 text-gray-700',
        day_button:
          'h-9 w-9 p-0 font-normal rounded-md transition-colors hover:bg-orange-500 hover:text-white aria-selected:hover:bg-orange-500 flex items-center justify-center text-sm',
        today: 'border-2 border-orange-500 text-orange-600 font-semibold',
        disabled: 'text-gray-300 opacity-50 cursor-not-allowed',
        nav: ' flex items-center justify-between mb-4',
        button_previous:
          'h-8 w-8 flex items-center justify-center rounded-md hover:bg-orange-100 text-orange-500 transition-colors',
        button_next:
          'h-8 w-8 flex items-center justify-center rounded-md hover:bg-orange-100 text-orange-500 transition-colors',
        chevron: 'fill-current w-4 h-4',
      }}
      modifiersClassNames={{
        selected: 'bg-orange-500 text-white rounded-md',
        outside: 'text-gray-200',
      }}
    />
  );
};
