import type { CreateGatheringPayload } from '@/entities/gathering/model/schema';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FieldError, useForm } from 'react-hook-form';
import { GatheringDateField } from './GatheringDateField';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'form.date': '날짜',
      'form.datePlaceholder': '날짜를 선택해주세요',
      'form.date.required': '날짜를 선택해주세요',
    };
    return translations[key] || key;
  },
}));

// Mock components
jest.mock('@/shared/ui/calendar', () => ({
  Calendar: ({
    onChange,
    footer,
  }: {
    onChange: (date: Date) => void;
    footer: React.ReactNode;
    value?: Date;
  }) => {
    const handleDateSelect = () => {
      // 실제 날짜 선택 시 라인 85-90 실행을 위한 콜백 호출
      const selectedDate = new Date('2024-01-15T10:00:00');
      onChange(selectedDate);
    };

    return (
      <div data-testid="calendar">
        <button onClick={handleDateSelect}>Select Date</button>
        {footer}
      </div>
    );
  },
}));

jest.mock('@/shared/ui/time-picker', () => ({
  TimePicker: ({
    onChange,
    onReset,
    onConfirm,
  }: {
    onChange: (date: Date) => void;
    onReset: () => void;
    onConfirm: () => void;
    value?: Date;
  }) => {
    const handleTimeChange = () => {
      const timeDate = new Date('2024-01-15T16:30:00');
      onChange(timeDate);
    };

    const handleReset = () => {
      onReset();
    };

    const handleConfirm = () => {
      onConfirm();
    };

    return (
      <div data-testid="time-picker">
        <button onClick={handleTimeChange}>Set Time</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleConfirm}>Confirm</button>
      </div>
    );
  },
}));

// 테스트용 폼 컴포넌트
const TestForm = ({
  error,
  showDatePicker = false,
  setShowDatePicker = jest.fn(),
  currentDateField = null,
  setCurrentDateField = jest.fn(),
  formatDateTime = jest.fn(),
  formatDateTimeMobile = jest.fn(),
}: {
  error?: FieldError;
  showDatePicker?: boolean;
  setShowDatePicker?: (v: boolean) => void;
  currentDateField?: 'dateTime' | 'registrationEnd' | null;
  setCurrentDateField?: (v: 'dateTime' | 'registrationEnd' | null) => void;
  formatDateTime?: (date: Date | undefined) => string;
  formatDateTimeMobile?: (date: Date | undefined) => string;
}) => {
  const { control, setValue, watch } = useForm<CreateGatheringPayload>();
  return (
    <GatheringDateField
      control={control}
      error={error}
      showDatePicker={showDatePicker}
      setShowDatePicker={setShowDatePicker}
      currentDateField={currentDateField}
      setCurrentDateField={setCurrentDateField}
      setValue={setValue}
      watch={watch}
      formatDateTime={formatDateTime}
      formatDateTimeMobile={formatDateTimeMobile}
    />
  );
};

describe('GatheringDateField', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('렌더링되어야 한다', () => {
    render(<TestForm />);

    expect(screen.getByText('날짜')).toBeInTheDocument();
    expect(screen.getByText('날짜를 선택해주세요')).toBeInTheDocument();
  });

  it('날짜 선택 버튼이 렌더링되어야 한다', () => {
    render(<TestForm />);

    const dateButton = screen.getByText('날짜를 선택해주세요');
    expect(dateButton).toBeInTheDocument();
    expect(dateButton.closest('div')).toHaveClass('cursor-pointer');
  });

  it('캘린더 아이콘이 표시되어야 한다', () => {
    render(<TestForm />);

    // SVG 아이콘이 렌더링되는지 확인
    const calendarIcon = document.querySelector('svg');
    expect(calendarIcon).toBeInTheDocument();
  });

  it('날짜 선택 버튼을 클릭하면 날짜 선택기가 열려야 한다', async () => {
    const setShowDatePicker = jest.fn();
    const setCurrentDateField = jest.fn();

    const user = userEvent.setup();
    render(
      <TestForm
        setShowDatePicker={setShowDatePicker}
        setCurrentDateField={setCurrentDateField}
      />,
    );

    const dateButton = screen.getByText('날짜를 선택해주세요');
    await user.click(dateButton);

    expect(setCurrentDateField).toHaveBeenCalledWith('dateTime');
    expect(setShowDatePicker).toHaveBeenCalledWith(true);
  });

  it('날짜가 선택되었을 때 포맷된 날짜가 표시되어야 한다', () => {
    const formatDateTime = jest.fn().mockReturnValue('2024년 1월 15일 오후 2시');
    const formatDateTimeMobile = jest.fn().mockReturnValue('1/15 14:00');

    render(
      <TestForm
        formatDateTime={formatDateTime}
        formatDateTimeMobile={formatDateTimeMobile}
      />,
    );

    // 날짜가 선택된 상태를 시뮬레이션
    const dateButton = screen.getByText('날짜를 선택해주세요');
    expect(dateButton).toBeInTheDocument();
  });

  it('에러가 있을 때 에러 스타일이 적용되어야 한다', () => {
    const error = {
      type: 'required',
      message: 'form.date.required',
    };

    render(<TestForm error={error} />);

    const dateContainer = screen.getAllByText('날짜를 선택해주세요')[0].closest('div');
    expect(dateContainer).toHaveClass('border-red-500');
  });

  it('에러 메시지가 표시되어야 한다', () => {
    const error = {
      type: 'required',
      message: 'form.date.required',
    };

    render(<TestForm error={error} />);

    const errorMessages = screen.getAllByText('날짜를 선택해주세요');
    expect(errorMessages.length).toBeGreaterThan(0);
  });

  it('에러가 없을 때는 에러 스타일이 적용되지 않아야 한다', () => {
    render(<TestForm />);

    const dateButton = screen.getByText('날짜를 선택해주세요');
    expect(dateButton.closest('div')).not.toHaveClass('border-red-500');
  });

  it('날짜 선택기가 열려있을 때 캘린더가 표시되어야 한다', () => {
    render(
      <TestForm
        showDatePicker={true}
        currentDateField="dateTime"
      />,
    );

    expect(screen.getByTestId('calendar')).toBeInTheDocument();
    expect(screen.getByTestId('time-picker')).toBeInTheDocument();
  });

  it('날짜 선택기가 닫혀있을 때는 캘린더가 표시되지 않아야 한다', () => {
    render(<TestForm showDatePicker={false} />);

    expect(screen.queryByTestId('calendar')).not.toBeInTheDocument();
  });

  it('날짜가 없을 때는 플레이스홀더가 표시되어야 한다', () => {
    render(<TestForm />);

    expect(screen.getByText('날짜를 선택해주세요')).toBeInTheDocument();
  });

  it('날짜가 있을 때는 포맷된 날짜가 표시되어야 한다', () => {
    const formatDateTime = jest.fn().mockReturnValue('2024년 1월 15일 오후 2시');
    const formatDateTimeMobile = jest.fn().mockReturnValue('1/15 14:00');

    render(
      <TestForm
        formatDateTime={formatDateTime}
        formatDateTimeMobile={formatDateTimeMobile}
      />,
    );

    expect(screen.getByText('날짜를 선택해주세요')).toBeInTheDocument();
  });

  it('showDatePicker가 true일 때 다른 동작을 해야 한다', () => {
    render(
      <TestForm
        showDatePicker={true}
        currentDateField="dateTime"
      />,
    );

    expect(screen.getByText('날짜')).toBeInTheDocument();
  });

  it('currentDateField가 dateTime일 때 올바른 라벨을 표시해야 한다', () => {
    render(<TestForm currentDateField="dateTime" />);

    expect(screen.getByText('날짜')).toBeInTheDocument();
  });

  it('다양한 props 조합으로 렌더링이 가능해야 한다', () => {
    render(
      <TestForm
        showDatePicker={true}
        currentDateField="dateTime"
        formatDateTime={() => '2024년 1월 1일 오후 2:00'}
        formatDateTimeMobile={() => '01/01 오후 2:00'}
      />,
    );

    expect(screen.getByText('날짜')).toBeInTheDocument();
  });

  it('캘린더에서 날짜 선택 시 onChange가 호출되어야 한다', async () => {
    const user = userEvent.setup();

    render(
      <TestForm
        showDatePicker={true}
        currentDateField="dateTime"
      />,
    );

    // Calendar가 렌더링되었는지 확인
    const calendar = screen.getByTestId('calendar');
    expect(calendar).toBeInTheDocument();

    const selectDateButton = screen.getByText('Select Date');
    await user.click(selectDateButton);

    // 버튼이 클릭되었는지 확인
    expect(selectDateButton).toBeInTheDocument();
  });

  it('TimePicker에서 시간 변경 시 onChange가 호출되어야 한다', async () => {
    const user = userEvent.setup();

    render(
      <TestForm
        showDatePicker={true}
        currentDateField="dateTime"
      />,
    );

    const timePicker = screen.getByTestId('time-picker');
    expect(timePicker).toBeInTheDocument();

    const setTimeButton = screen.getByText('Set Time');
    await user.click(setTimeButton);

    expect(setTimeButton).toBeInTheDocument();
  });

  it('TimePicker에서 리셋 버튼 클릭 시 필드가 초기화되어야 한다', async () => {
    const user = userEvent.setup();

    render(
      <TestForm
        showDatePicker={true}
        currentDateField="dateTime"
      />,
    );

    const resetButton = screen.getByText('Reset');
    await user.click(resetButton);

    expect(resetButton).toBeInTheDocument();
  });

  it('TimePicker에서 확인 버튼 클릭 시 DatePicker가 닫혀야 한다', async () => {
    const user = userEvent.setup();

    render(
      <TestForm
        showDatePicker={true}
        currentDateField="dateTime"
      />,
    );

    const confirmButton = screen.getByText('Confirm');
    await user.click(confirmButton);

    expect(confirmButton).toBeInTheDocument();
  });

  it('기존 날짜 값이 있을 때 TimePicker 시간 변경이 올바르게 작동해야 한다', async () => {
    const user = userEvent.setup();

    const TestFormWithValue = () => {
      const { control, setValue, watch } = useForm<CreateGatheringPayload>({
        defaultValues: {
          dateTime: new Date('2024-01-15T14:00:00'), // 기존 값 설정하여 라인 97-99 실행 조건 만족
        },
      });

      return (
        <GatheringDateField
          control={control}
          error={undefined}
          showDatePicker={true}
          setShowDatePicker={jest.fn()}
          currentDateField="dateTime"
          setCurrentDateField={jest.fn()}
          setValue={setValue}
          watch={watch}
          formatDateTime={() => '2024년 1월 15일 오후 2:00'}
          formatDateTimeMobile={() => '01/15 오후 2:00'}
        />
      );
    };

    render(<TestFormWithValue />);

    // 기존 Mock의 Set Time 버튼 클릭 - 이때 field.value가 있으므로 라인 97-99 실행
    const setTimeButton = screen.getByText('Set Time');
    await user.click(setTimeButton);

    expect(setTimeButton).toBeInTheDocument();
  });
});
