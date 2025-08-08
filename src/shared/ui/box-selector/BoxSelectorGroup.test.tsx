import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BoxSelectorGroup } from './BoxSelectorGroup';

// 아이콘 모킹
jest.mock('../icon', () => ({
  CheckBoxIcon: ({ size }: { size: number }) => (
    <div
      data-testid="check-box-icon"
      style={{ width: size, height: size }}
    >
      ✓
    </div>
  ),
  VacantCheckBoxIcon: ({ size }: { size: number }) => (
    <div
      data-testid="vacant-check-box-icon"
      style={{ width: size, height: size }}
    >
      ☐
    </div>
  ),
}));

describe('BoxSelectorGroup 컴포넌트', () => {
  const mockOptions = [
    { id: 'option1', title: '옵션 1', subtitle: '부제목 1' },
    { id: 'option2', title: '옵션 2', subtitle: '부제목 2' },
    { id: 'option3', title: '옵션 3' },
  ];

  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('기본 옵션들이 렌더링되어야 한다', () => {
    render(
      <BoxSelectorGroup
        options={mockOptions}
        onChange={mockOnChange}
      />,
    );

    expect(screen.getByText('옵션 1')).toBeInTheDocument();
    expect(screen.getByText('옵션 2')).toBeInTheDocument();
    expect(screen.getByText('옵션 3')).toBeInTheDocument();
    expect(screen.getByText('부제목 1')).toBeInTheDocument();
    expect(screen.getByText('부제목 2')).toBeInTheDocument();
  });

  it('옵션을 클릭하면 onChange가 호출되어야 한다', () => {
    render(
      <BoxSelectorGroup
        options={mockOptions}
        onChange={mockOnChange}
      />,
    );

    const option1 = screen.getByText('옵션 1').closest('div');
    fireEvent.click(option1!);

    expect(mockOnChange).toHaveBeenCalledWith('option1');
  });

  it('이미 선택된 옵션을 클릭하면 선택이 해제되어야 한다', () => {
    render(
      <BoxSelectorGroup
        options={mockOptions}
        value="option1"
        onChange={mockOnChange}
      />,
    );

    const option1 = screen.getByText('옵션 1').closest('div');
    fireEvent.click(option1!);

    expect(mockOnChange).toHaveBeenCalledWith(null);
  });

  it('disabled가 true이면 옵션 클릭이 무시되어야 한다', () => {
    render(
      <BoxSelectorGroup
        options={mockOptions}
        disabled={true}
        onChange={mockOnChange}
      />,
    );

    const option1 = screen.getByText('옵션 1').closest('div');
    fireEvent.click(option1!);

    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('개별 옵션이 disabled이면 해당 옵션만 클릭이 무시되어야 한다', () => {
    const optionsWithDisabled = [
      { id: 'option1', title: '옵션 1' },
      { id: 'option2', title: '옵션 2', disabled: true },
      { id: 'option3', title: '옵션 3' },
    ];

    render(
      <BoxSelectorGroup
        options={optionsWithDisabled}
        onChange={mockOnChange}
      />,
    );

    // 활성화된 옵션 클릭
    const option1 = screen.getByText('옵션 1').closest('div');
    fireEvent.click(option1!);
    expect(mockOnChange).toHaveBeenCalledWith('option1');

    // 비활성화된 옵션 클릭
    const option2 = screen.getByText('옵션 2').closest('div');
    fireEvent.click(option2!);
    expect(mockOnChange).toHaveBeenCalledTimes(1); // 추가 호출되지 않음
  });

  it('value prop이 전달되면 해당 옵션이 선택된 상태로 렌더링되어야 한다', () => {
    render(
      <BoxSelectorGroup
        options={mockOptions}
        value="option2"
        onChange={mockOnChange}
      />,
    );

    // 선택된 옵션에는 체크 아이콘이 표시되어야 함
    const checkIcons = screen.getAllByTestId('check-box-icon');
    expect(checkIcons).toHaveLength(1);
  });

  it('className이 올바르게 적용되어야 한다', () => {
    const { container } = render(
      <BoxSelectorGroup
        options={mockOptions}
        onChange={mockOnChange}
        className="custom-class"
      />,
    );

    // 최상위 컨테이너를 찾기 위해 첫 번째 자식 요소를 확인
    const firstChild = container.firstChild as HTMLElement;
    expect(firstChild).toHaveClass('custom-class');
  });

  it('layout이 vertical이면 세로 배치되어야 한다', () => {
    const { container } = render(
      <BoxSelectorGroup
        options={mockOptions}
        onChange={mockOnChange}
        layout="vertical"
      />,
    );

    const firstChild = container.firstChild as HTMLElement;
    expect(firstChild).toHaveClass('flex', 'flex-col');
  });

  it('layout이 grid이면 그리드 배치되어야 한다', () => {
    const { container } = render(
      <BoxSelectorGroup
        options={mockOptions}
        onChange={mockOnChange}
        layout="grid"
      />,
    );

    const firstChild = container.firstChild as HTMLElement;
    expect(firstChild).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
  });

  it('gap이 올바르게 적용되어야 한다', () => {
    const { container } = render(
      <BoxSelectorGroup
        options={mockOptions}
        onChange={mockOnChange}
        gap="24px"
      />,
    );

    const firstChild = container.firstChild as HTMLElement;
    expect(firstChild).toHaveStyle({ gap: '24px' });
  });

  it('onChange가 없어도 내부 상태로 동작해야 한다', () => {
    render(<BoxSelectorGroup options={mockOptions} />);

    const option1 = screen.getByText('옵션 1').closest('div');
    fireEvent.click(option1!);

    // 내부 상태로 선택되므로 체크 아이콘이 표시되어야 함
    const checkIcons = screen.getAllByTestId('check-box-icon');
    expect(checkIcons).toHaveLength(1);
  });
});
