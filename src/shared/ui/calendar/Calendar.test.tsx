import { fireEvent, render, screen } from '@testing-library/react';
import { Calendar } from './Calendar';

describe('Calendar', () => {
  it('선택된 날짜가 캘린더에 표시된다', () => {
    const mockOnChange = jest.fn();
    const selectedDate = new Date('2025-01-15');

    render(
      <Calendar
        value={selectedDate}
        onChange={mockOnChange}
      />,
    );

    const selectedButton = screen.getByRole('button', { name: /15/ });
    expect(selectedButton).toHaveClass('hover:bg-orange-500');
  });

  it('날짜를 선택하면 onChange가 호출된다', () => {
    const mockOnChange = jest.fn();

    render(
      <Calendar
        value={undefined}
        onChange={mockOnChange}
      />,
    );

    const dateButton = screen.getByRole('button', { name: /15/ });
    fireEvent.click(dateButton);

    expect(mockOnChange).toHaveBeenCalled();
  });

  it('footer가 정상적으로 렌더링된다', () => {
    const mockOnChange = jest.fn();

    render(
      <Calendar
        value={new Date()}
        onChange={mockOnChange}
        footer={
          <div className="flex gap-2">
            <button>초기화</button>
            <button>적용</button>
          </div>
        }
      />,
    );

    expect(screen.getByText('적용')).toBeInTheDocument();
    expect(screen.getByText('초기화')).toBeInTheDocument();
  });

  it('disabled 상태에서는 날짜 버튼이 모두 비활성화된다', () => {
    const mockOnChange = jest.fn();

    render(
      <Calendar
        value={new Date()}
        onChange={mockOnChange}
        disabled={true}
      />,
    );

    const currentYear = new Date().getFullYear();
    const allButtons = screen.getAllByRole('button');
    const dateButtons = allButtons.filter((button) =>
      button.getAttribute('aria-label')?.includes(currentYear.toString()),
    );

    dateButtons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });

  it('className이 정상적으로 적용된다', () => {
    const mockOnChange = jest.fn();

    const { container } = render(
      <Calendar
        value={new Date()}
        onChange={mockOnChange}
        className="custom-class"
      />,
    );

    // 커스텀 클래스가 적용되었는지 확인
    const calendarRoot = container.firstChild as HTMLElement;
    expect(calendarRoot).toHaveClass('custom-class');
  });

  it('value가 undefined여도 캘린더가 렌더링된다', () => {
    const mockOnChange = jest.fn();

    render(
      <Calendar
        value={undefined}
        onChange={mockOnChange}
      />,
    );

    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('네비게이션 버튼이 렌더링된다', () => {
    const mockOnChange = jest.fn();

    render(
      <Calendar
        value={new Date()}
        onChange={mockOnChange}
      />,
    );

    expect(screen.getByRole('button', { name: /Previous Month/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Next Month/ })).toBeInTheDocument();
  });
});
