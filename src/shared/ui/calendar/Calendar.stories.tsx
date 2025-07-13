import { useState } from 'react';
import { Calendar } from './Calendar';

export default {
  title: 'shared/ui/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

// 기본 Calendar
export const Default = () => {
  const [value, setValue] = useState<Date | undefined>(new Date());

  return (
    <Calendar
      value={value}
      onChange={(date: Date | undefined) => setValue(date)}
    />
  );
};

// 푸터가 있는 Calendar
export const WithFooter = () => {
  const [value, setValue] = useState<Date | undefined>(new Date());

  return (
    <Calendar
      value={value}
      onChange={(date: Date | undefined) => setValue(date)}
      footer={
        <div className="flex w-full gap-2">
          <button
            onClick={() => setValue(undefined)}
            className="flex-1 rounded-md border border-orange-500 px-4 py-2 text-orange-500 hover:bg-orange-50"
          >
            초기화
          </button>
          <button className="flex-1 rounded-md bg-orange-500 px-4 py-2 text-white hover:bg-orange-600">
            적용
          </button>
        </div>
      }
    />
  );
};
