import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Chip } from './Chip';

describe('Chip 컴포넌트', () => {
  it('자식 요소를 정상적으로 렌더링한다.', () => {
    render(<Chip>Hello World</Chip>);
    const chipElement = screen.getByText('Hello World');
    expect(chipElement).toBeInTheDocument();
  });

  it('props가 없으면 기본 스타일(active: false, size: sm)을 적용한다.', () => {
    render(<Chip>Default Chip</Chip>);
    const chipElement = screen.getByText('Default Chip');

    // active: false 기본값 클래스 확인
    expect(chipElement).toHaveClass('bg-gray-200', 'text-gray-900');
    expect(chipElement).not.toHaveClass('bg-gray-900', 'text-white');

    // size: 'sm' 기본값 클래스 확인
    expect(chipElement).toHaveClass('h-[36px]', 'px-3', 'py-2');
  });

  it('active prop이 true이면 활성 스타일을 적용한다.', () => {
    render(<Chip active>Active Chip</Chip>);
    const chipElement = screen.getByText('Active Chip');

    expect(chipElement).toHaveClass('bg-gray-900', 'text-white');
    expect(chipElement).not.toHaveClass('bg-gray-200', 'text-gray-900');
  });

  describe('size prop에 따른 스타일', () => {
    it('size="sm"일 때 작은 사이즈 스타일을 적용한다.', () => {
      render(<Chip size="sm">Small Chip</Chip>);
      const chipElement = screen.getByText('Small Chip');
      expect(chipElement).toHaveClass('h-[36px]', 'px-3', 'py-2');
    });

    it('size="lg"일 때 큰 사이즈 스타일을 적용한다.', () => {
      render(<Chip size="lg">Large Chip</Chip>);
      const chipElement = screen.getByText('Large Chip');
      expect(chipElement).toHaveClass('h-[40px]', 'px-4', 'py-[10px]');
    });
  });

  it('추가 className을 기존 클래스와 병합한다.', () => {
    const customClass = 'my-custom-class';
    render(<Chip className={customClass}>Custom Class Chip</Chip>);
    const chipElement = screen.getByText('Custom Class Chip');

    expect(chipElement).toHaveClass('bg-gray-200'); // 기본 active:false 클래스
    expect(chipElement).toHaveClass(customClass); // 추가된 클래스
  });

  it('클릭 이벤트를 정상적으로 처리한다.', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(<Chip onClick={handleClick}>Clickable Chip</Chip>);
    const chipElement = screen.getByText('Clickable Chip');

    await user.click(chipElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
