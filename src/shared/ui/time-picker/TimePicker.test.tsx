import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { TimePicker } from './TimePicker';

// next-intl 모킹
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'ui.timePicker.hour': 'hour',
      'ui.timePicker.minute': 'minute',
      'ui.timePicker.period': 'period',
      'ui.timePicker.am': 'AM',
      'ui.timePicker.pm': 'PM',
      'ui.timePicker.reset': 'reset',
      'ui.timePicker.confirm': 'confirm',
    };
    return translations[key] || key;
  },
}));

describe('TimePicker 컴포넌트', () => {
  const mockOnChange = jest.fn();
  const mockOnConfirm = jest.fn();
  const mockOnReset = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('기본값으로 렌더링되어야 한다', () => {
    render(<TimePicker onChange={mockOnChange} />);

    // 기본값 확인 (14시 = 2 PM)
    const hourElements = screen.getAllByText('02');
    expect(hourElements.length).toBeGreaterThan(0);
    expect(screen.getByText('00')).toBeInTheDocument();
  });

  it('value prop이 전달되면 해당 값으로 렌더링되어야 한다', () => {
    const testDate = new Date(2024, 0, 1, 9, 30); // 9:30 AM
    render(
      <TimePicker
        value={testDate}
        onChange={mockOnChange}
      />,
    );

    const hourElements = screen.getAllByText('09');
    expect(hourElements.length).toBeGreaterThan(0);
    expect(screen.getByText('30')).toBeInTheDocument();
  });

  it('시간을 클릭하면 선택된 시간이 변경되어야 한다', () => {
    render(<TimePicker onChange={mockOnChange} />);

    const hourElements = screen.getAllByText('03');
    const hour3 = hourElements[0];
    fireEvent.click(hour3);

    expect(hour3).toHaveClass('bg-orange-500');
  });

  it('분을 클릭하면 선택된 분이 변경되어야 한다', () => {
    render(<TimePicker onChange={mockOnChange} />);

    const minuteElements = screen.getAllByText('15');
    const minute15 = minuteElements[0];
    fireEvent.click(minute15);

    expect(minute15).toHaveClass('bg-orange-500');
  });

  it('확인 버튼을 클릭하면 onChange가 호출되어야 한다', () => {
    render(
      <TimePicker
        onChange={mockOnChange}
        onConfirm={mockOnConfirm}
      />,
    );

    const confirmButton = screen.getByText('confirm');
    fireEvent.click(confirmButton);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it('초기화 버튼을 클릭하면 기본값으로 초기화되어야 한다', () => {
    render(
      <TimePicker
        onChange={mockOnChange}
        onReset={mockOnReset}
      />,
    );

    const hourElements = screen.getAllByText('03');
    const hour3 = hourElements[0];
    fireEvent.click(hour3);

    const resetButton = screen.getByText('reset');
    fireEvent.click(resetButton);

    const selectedHourElements = screen.getAllByText('01');
    const selectedHour = selectedHourElements[0];
    expect(selectedHour).toHaveClass('bg-orange-500');
    expect(screen.getByText('00')).toBeInTheDocument();
    expect(mockOnReset).toHaveBeenCalledTimes(1);
  });

  it('확인 버튼 클릭 시 24시간 형식으로 올바르게 변환되어야 한다', () => {
    render(<TimePicker onChange={mockOnChange} />);

    const hourElements = screen.getAllByText('03');
    const hour3 = hourElements[0];
    fireEvent.click(hour3);

    const confirmButton = screen.getByText('confirm');
    fireEvent.click(confirmButton);

    expect(mockOnChange).toHaveBeenCalledWith(expect.any(Date));
    const calledDate = mockOnChange.mock.calls[0][0];
    expect(calledDate.getHours()).toBe(15);
    expect(calledDate.getMinutes()).toBe(0);
  });

  it('className이 올바르게 적용되어야 한다', () => {
    render(
      <TimePicker
        onChange={mockOnChange}
        className="custom-class"
      />,
    );

    const hourLabel = screen.getByText('hour');
    const container = hourLabel.closest('div')?.parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('시간과 분이 모두 변경되면 올바르게 반영되어야 한다', () => {
    render(<TimePicker onChange={mockOnChange} />);

    const hourElements = screen.getAllByText('05');
    const hour5 = hourElements[0];
    fireEvent.click(hour5);

    const minuteElements = screen.getAllByText('30');
    const minute30 = minuteElements[0];
    fireEvent.click(minute30);

    const confirmButton = screen.getByText('confirm');
    fireEvent.click(confirmButton);

    expect(mockOnChange).toHaveBeenCalledWith(expect.any(Date));
    const calledDate = mockOnChange.mock.calls[0][0];
    expect(calledDate.getHours()).toBe(17);
    expect(calledDate.getMinutes()).toBe(30);
  });
});
