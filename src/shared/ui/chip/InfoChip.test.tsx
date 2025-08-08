import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InfoChip } from './InfoChip';

describe('InfoChip 컴포넌트', () => {
  it('info prop으로 전달된 텍스트를 렌더링한다.', () => {
    const testInfo = '오후 2:00';
    render(<InfoChip info={testInfo} />);
    const chipElement = screen.getByText(testInfo);
    expect(chipElement).toBeInTheDocument();
  });

  it('variant prop이 없으면 기본(default) 스타일을 적용한다.', () => {
    render(<InfoChip info="Default Chip" />);
    const chipElement = screen.getByText('Default Chip');

    expect(chipElement).toHaveClass('bg-gray-900', 'text-white');
    expect(chipElement).not.toHaveClass('text-orange-600');
  });

  describe('variant prop에 따른 스타일', () => {
    it('variant="default"일 때 기본 스타일을 적용한다.', () => {
      render(
        <InfoChip
          info="Explicit Default"
          variant="default"
        />,
      );
      const chipElement = screen.getByText('Explicit Default');
      expect(chipElement).toHaveClass('bg-gray-900', 'text-white');
    });

    it('variant="time"일 때 시간 스타일을 적용한다.', () => {
      render(
        <InfoChip
          info="Time Chip"
          variant="time"
        />,
      );
      const chipElement = screen.getByText('Time Chip');
      expect(chipElement).toHaveClass('bg-gray-900', 'text-orange-600');
      expect(chipElement).not.toHaveClass('text-white');
    });
  });

  it('추가 className을 기존 클래스와 병합한다.', () => {
    const customClass = 'font-bold mt-2';
    render(
      <InfoChip
        info="Custom Class"
        className={customClass}
      />,
    );
    const chipElement = screen.getByText('Custom Class');

    expect(chipElement).toHaveClass('bg-gray-900');
    expect(chipElement).toHaveClass(customClass);
  });

  it('클릭 이벤트를 정상적으로 처리한다.', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(
      <InfoChip
        info="Clickable"
        onClick={handleClick}
      />,
    );
    const chipElement = screen.getByText('Clickable');

    await user.click(chipElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('다른 HTML 속성들을 정상적으로 전달한다.', () => {
    const testId = 'my-info-chip';
    render(
      <InfoChip
        info="With Data ID"
        data-testid={testId}
      />,
    );

    const chipElement = screen.getByTestId(testId);
    expect(chipElement).toBeInTheDocument();
    expect(chipElement).toHaveTextContent('With Data ID');
  });
});
