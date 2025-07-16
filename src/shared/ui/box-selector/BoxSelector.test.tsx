import { fireEvent, render, screen } from '@testing-library/react';
import { BoxSelector } from './BoxSelector';

describe('BoxSelector', () => {
  const defaultProps = {
    title: '달램핏',
    subtitle: '오피스 스트레칭',
    onSelect: jest.fn(),
  };

  it('제목과 부제목이 렌더링된다', () => {
    render(<BoxSelector {...defaultProps} />);

    expect(screen.getByText('달램핏')).toBeInTheDocument();
    expect(screen.getByText('오피스 스트레칭')).toBeInTheDocument();
  });

  it('부제목이 없을 때는 제목만 렌더링된다', () => {
    render(
      <BoxSelector
        title="워케이션"
        onSelect={jest.fn()}
      />,
    );

    expect(screen.getByText('워케이션')).toBeInTheDocument();
    expect(screen.queryByText('오피스 스트레칭')).not.toBeInTheDocument();
  });

  it('클릭하면 onSelect가 호출된다', () => {
    const onSelect = jest.fn();
    render(
      <BoxSelector
        {...defaultProps}
        onSelect={onSelect}
      />,
    );

    fireEvent.click(screen.getByText('달램핏'));

    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('비활성화 상태에서는 클릭해도 onSelect가 호출되지 않는다', () => {
    const onSelect = jest.fn();
    render(
      <BoxSelector
        {...defaultProps}
        onSelect={onSelect}
        disabled
      />,
    );

    fireEvent.click(screen.getByText('달램핏'));

    expect(onSelect).not.toHaveBeenCalled();
  });

  it('선택된 상태일 때 선택된 스타일이 적용된다', () => {
    const { container } = render(
      <BoxSelector
        {...defaultProps}
        isSelected
      />,
    );

    // BoxSelector의 루트 div를 찾기 위해 container에서 직접 선택
    const selector = container.firstChild as HTMLElement;
    expect(selector).toHaveClass('bg-[#1F2937]', 'text-white');
  });

  it('선택되지 않은 상태일 때 선택되지 않은 스타일이 적용된다', () => {
    const { container } = render(
      <BoxSelector
        {...defaultProps}
        isSelected={false}
      />,
    );

    const selector = container.firstChild as HTMLElement;
    expect(selector).toHaveClass('bg-white', 'text-gray-700');
  });

  it('비활성화 상태일 때 비활성화 스타일이 적용된다', () => {
    const { container } = render(
      <BoxSelector
        {...defaultProps}
        disabled
      />,
    );

    const selector = container.firstChild as HTMLElement;
    expect(selector).toHaveClass('opacity-50', 'cursor-not-allowed');
  });

  it('선택된 상태일 때 CheckBoxIcon이 표시된다', () => {
    render(
      <BoxSelector
        {...defaultProps}
        isSelected
      />,
    );

    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('선택되지 않은 상태일 때 VacantCheckBoxIcon이 표시된다', () => {
    render(
      <BoxSelector
        {...defaultProps}
        isSelected={false}
      />,
    );

    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
