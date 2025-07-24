import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/cn';

export interface TimePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
  onConfirm?: () => void;
  onReset?: () => void;
  className?: string;
}

export const TimePicker = ({ value, onChange, onConfirm, onReset, className }: TimePickerProps) => {
  const t = useTranslations('ui.timePicker');
  const pathname = usePathname();
  const [selectedHour, setSelectedHour] = useState(value?.getHours() || 14);
  const [selectedMinute, setSelectedMinute] = useState(value?.getMinutes() || 0);
  const [selectedPeriod, setSelectedPeriod] = useState<'AM' | 'PM'>(
    (value?.getHours() || 14) >= 12 ? 'PM' : 'AM',
  );

  // URL에서 로케일 추출
  const locale = pathname?.split('/')[1] || 'ko';
  const isKorean = locale === 'ko';
  const periodOptions = isKorean ? [t('am'), t('pm')] : ['AM', 'PM'];

  // value가 변경될 때 상태 업데이트
  useEffect(() => {
    if (value) {
      const hours = value.getHours();
      const minutes = value.getMinutes();

      // 12시간 형식으로 변환
      const hour12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
      const period = hours >= 12 ? 'PM' : 'AM';

      setSelectedHour(hour12);
      setSelectedMinute(minutes);
      setSelectedPeriod(period);
    }
    // value가 undefined일 때는 상태를 초기화하지 않음 (초기화 버튼 클릭 시)
  }, [value, locale]);

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const handleTimeChange = (type: 'hour' | 'minute' | 'period', newValue: number | 'AM' | 'PM') => {
    if (type === 'hour') {
      setSelectedHour(newValue as number);
    } else if (type === 'minute') {
      setSelectedMinute(newValue as number);
    } else if (type === 'period') {
      setSelectedPeriod(newValue as 'AM' | 'PM');
    }
  };

  const handleConfirm = () => {
    // 24시간 형식으로 변환
    const hour24 =
      selectedPeriod === 'PM'
        ? selectedHour === 12
          ? 12
          : selectedHour + 12
        : selectedHour === 12
          ? 0
          : selectedHour;

    const newDate = new Date();
    newDate.setHours(hour24, selectedMinute, 0, 0);

    onChange(newDate);
    onConfirm?.();
  };

  return (
    <div className={cn('flex items-center gap-2 rounded-xl bg-white p-4 shadow-sm', className)}>
      {/* 시간 선택 */}
      <div className="flex flex-col items-center">
        <label className="mb-1 text-xs text-gray-500">{t('hour')}</label>
        <div className="h-24 w-16 overflow-y-auto rounded-md border border-gray-200 bg-white [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-transparent">
          {hours.map((hour) => (
            <div
              key={hour}
              className={cn(
                'flex h-8 cursor-pointer items-center justify-center text-sm transition-colors',
                selectedHour === hour
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'hover:bg-orange-50',
              )}
              onClick={() => handleTimeChange('hour', hour)}
            >
              {hour.toString().padStart(2, '0')}
            </div>
          ))}
        </div>
      </div>

      <span className="text-xl text-gray-400">:</span>

      {/* 분 선택 */}
      <div className="flex flex-col items-center">
        <label className="mb-1 text-xs text-gray-500">{t('minute')}</label>
        <div className="h-24 w-16 overflow-y-auto rounded-md border border-gray-200 bg-white [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-transparent">
          {minutes.map((minute) => (
            <div
              key={minute}
              className={cn(
                'flex h-8 cursor-pointer items-center justify-center text-sm transition-colors',
                selectedMinute === minute
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'hover:bg-orange-50',
              )}
              onClick={() => handleTimeChange('minute', minute)}
            >
              {minute.toString().padStart(2, '0')}
            </div>
          ))}
        </div>
      </div>

      {/* AM/PM 선택 */}
      <div className="flex flex-col items-center">
        <label className="mb-1 text-xs text-gray-500">{isKorean ? '오전/오후' : 'AM/PM'}</label>
        <div className="h-24 w-16 overflow-y-auto rounded-md border border-gray-200 bg-white [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-transparent">
          {periodOptions.map((period) => (
            <div
              key={period}
              className={cn(
                'flex h-8 cursor-pointer items-center justify-center text-sm transition-colors',
                selectedPeriod === (isKorean ? (period === t('am') ? 'AM' : 'PM') : period)
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'hover:bg-orange-50',
              )}
              onClick={() =>
                handleTimeChange(
                  'period',
                  isKorean ? (period === t('am') ? 'AM' : 'PM') : (period as 'AM' | 'PM'),
                )
              }
            >
              {period}
            </div>
          ))}
        </div>
      </div>

      {/* 버튼 컨테이너 */}
      <div className="flex flex-col gap-2">
        {/* 초기화 버튼 */}
        <button
          type="button"
          onClick={() => {
            // TimePicker 내부 상태 완전 초기화
            setSelectedHour(1);
            setSelectedMinute(0);
            setSelectedPeriod('AM');
            // 외부에서 날짜도 초기화
            onReset?.();
          }}
          className="h-11 w-20 rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-gray-700 transition-colors hover:bg-gray-50"
        >
          {t('reset')}
        </button>

        {/* 확인 버튼 */}
        <button
          type="button"
          onClick={handleConfirm}
          className="h-11 w-20 rounded-md bg-orange-500 px-4 py-2 text-center text-white transition-colors hover:bg-orange-600"
        >
          {t('confirm')}
        </button>
      </div>
    </div>
  );
};
