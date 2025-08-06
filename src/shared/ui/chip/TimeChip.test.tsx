import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TimeChip } from './TimeChip';

describe('TimeChip 컴포넌트', () => {
  it('자식 요소를 정상적으로 렌더링한다.', () => {
    render(<TimeChip>14:00</TimeChip>);
    expect(screen.getByText('14:00')).toBeInTheDocument();
  });

  it('기본적으로 "available" 스타일을 적용한다.', () => {
    render(<TimeChip>14:00</TimeChip>);
    const chipElement = screen.getByText('14:00');
    expect(chipElement).toHaveClass('bg-gray-50', 'text-gray-900', 'border', 'border-gray-300');
  });

  describe.each([
    {
      variant: 'available' as const,
      text: 'Available',
      expectedClasses: ['bg-gray-50', 'text-gray-900', 'border', 'border-gray-300'],
    },
    {
      variant: 'selected' as const,
      text: 'Selected',
      expectedClasses: ['bg-gray-900', 'text-white'],
    },
    {
      variant: 'disabled' as const,
      text: 'Disabled',
      expectedClasses: ['bg-gray-200', 'text-gray-400', 'cursor-not-allowed'],
    },
  ])('variant가 "$variant"일 때', ({ variant, text, expectedClasses }) => {
    it('올바른 스타일을 적용한다.', () => {
      render(<TimeChip variant={variant}>{text}</TimeChip>);
      const chipElement = screen.getByText(text);

      expectedClasses.forEach((className) => {
        expect(chipElement).toHaveClass(className);
      });
    });
  });

  describe('클릭 이벤트 처리', () => {
    it('"available" 상태에서 클릭 이벤트를 처리한다.', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      render(
        <TimeChip
          variant="available"
          onClick={handleClick}
        >
          Click me
        </TimeChip>,
      );

      await user.click(screen.getByText('Click me'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('"selected" 상태에서 클릭 이벤트를 처리한다.', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      render(
        <TimeChip
          variant="selected"
          onClick={handleClick}
        >
          Click me
        </TimeChip>,
      );

      await user.click(screen.getByText('Click me'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('"disabled" 상태에서도 클릭 이벤트는 호출된다.', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      render(
        <TimeChip
          variant="disabled"
          onClick={handleClick}
        >
          Disabled
        </TimeChip>,
      );

      await user.click(screen.getByText('Disabled'));
      // 컴포넌트가 프로그래밍적으로 비활성화된 것이 아니므로 이벤트는 발생함
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  it('추가 className을 올바르게 병합한다.', () => {
    const customClass = 'w-full';
    render(<TimeChip className={customClass}>Full Width</TimeChip>);
    const chipElement = screen.getByText('Full Width');

    expect(chipElement).toHaveClass('bg-gray-50'); // 기본 스타일 유지 확인
    expect(chipElement).toHaveClass(customClass); // 추가 클래스 적용 확인
  });
});
