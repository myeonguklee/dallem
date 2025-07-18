import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Sort } from './Sort';

const mockOptions = [
  { label: '마감 임박', value: 'deadline' },
  { label: '최신순', value: 'latest' },
  { label: '인기순', value: 'popular' },
];

const defaultProps = {
  options: mockOptions,
  selected: 'deadline',
  onChange: jest.fn(),
};

describe('Sort', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('기본 렌더링이 올바르게 되어야 한다', () => {
    render(<Sort {...defaultProps} />);

    expect(screen.getByText('마감 임박')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('선택된 옵션이 올바르게 표시되어야 한다', () => {
    render(
      <Sort
        {...defaultProps}
        selected="latest"
      />,
    );

    expect(screen.getByText('최신순')).toBeInTheDocument();
  });

  it('버튼 클릭 시 드롭다운이 열려야 한다', async () => {
    const user = userEvent.setup();
    render(<Sort {...defaultProps} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(screen.getByText('최신순')).toBeInTheDocument();
    expect(screen.getByText('인기순')).toBeInTheDocument();
  });

  it('옵션 클릭 시 onChange가 호출되어야 한다', async () => {
    const mockOnChange = jest.fn();
    const user = userEvent.setup();
    render(
      <Sort
        {...defaultProps}
        onChange={mockOnChange}
      />,
    );

    const button = screen.getByRole('button');
    await user.click(button);

    const option = screen.getByText('최신순');
    await user.click(option);

    expect(mockOnChange).toHaveBeenCalledWith('latest');
  });

  it('ESC 키를 누르면 드롭다운이 닫혀야 한다', async () => {
    const user = userEvent.setup();
    render(<Sort {...defaultProps} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(screen.getByText('최신순')).toBeInTheDocument();

    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.queryByText('최신순')).not.toBeInTheDocument();
    });
  });

  it('화살표 키로 옵션을 탐색할 수 있어야 한다', async () => {
    const user = userEvent.setup();
    render(<Sort {...defaultProps} />);

    const button = screen.getByRole('button');
    await user.click(button);

    // 다음 옵션으로 이동
    await user.keyboard('{ArrowDown}');
    expect(screen.getByText('최신순')).toHaveFocus();
  });

  it('화살표 키로 위쪽 옵션을 탐색할 수 있어야 한다', async () => {
    const user = userEvent.setup();
    render(<Sort {...defaultProps} />);

    const button = screen.getByRole('button');
    await user.click(button);

    // 다음 옵션에 포커스
    await user.keyboard('{ArrowDown}');
    expect(screen.getAllByText('최신순')[0]).toHaveFocus();

    // 위쪽 옵션으로 이동
    await user.keyboard('{ArrowUp}');
    expect(screen.getAllByText('마감 임박')[1]).toHaveFocus();
  });

  it('Enter 키로 옵션을 선택할 수 있어야 한다', async () => {
    const mockOnChange = jest.fn();
    const user = userEvent.setup();
    render(
      <Sort
        {...defaultProps}
        onChange={mockOnChange}
      />,
    );

    const button = screen.getByRole('button');
    await user.click(button);

    // 다음 옵션으로 이동
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Enter}');

    expect(mockOnChange).toHaveBeenCalledWith('latest');
  });

  it('Space 키로 옵션을 선택할 수 있어야 한다', async () => {
    const mockOnChange = jest.fn();
    const user = userEvent.setup();
    render(
      <Sort
        {...defaultProps}
        onChange={mockOnChange}
      />,
    );

    const button = screen.getByRole('button');
    await user.click(button);

    // 첫 번째 옵션으로 이동
    await user.keyboard('{ArrowDown}');
    await user.keyboard(' ');

    expect(mockOnChange).toHaveBeenCalledWith('latest');
  });

  it('바깥 클릭 시 드롭다운이 닫혀야 한다', async () => {
    const user = userEvent.setup();
    render(<Sort {...defaultProps} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(screen.getByText('최신순')).toBeInTheDocument();

    // 바깥 클릭
    fireEvent.mouseDown(document.body);

    await waitFor(() => {
      expect(screen.queryByText('최신순')).not.toBeInTheDocument();
    });
  });

  it('className prop이 올바르게 적용되어야 한다', () => {
    render(
      <Sort
        {...defaultProps}
        className="custom-class"
      />,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('드롭다운에서 선택된 옵션이 강조되어야 한다', async () => {
    const user = userEvent.setup();
    render(
      <Sort
        {...defaultProps}
        selected="latest"
      />,
    );

    const button = screen.getByRole('button');
    await user.click(button);

    const selectedOption = screen.getAllByText('최신순')[1];
    expect(selectedOption).toHaveClass('font-bold');
    expect(selectedOption).toHaveClass('text-[var(--semantic-color-primary)]');
  });

  it('키보드로 드롭다운 내비게이션이 가능하다', async () => {
    const onChange = jest.fn();
    render(
      <Sort
        {...defaultProps}
        onChange={onChange}
      />,
    );
    const button = screen.getByRole('button');
    // 드롭다운 열기
    await userEvent.click(button);
    // ↓ 키로 두 번째 옵션으로 이동
    fireEvent.keyDown(button.parentElement!, { key: 'ArrowDown' });
    fireEvent.keyDown(button.parentElement!, { key: 'ArrowDown' });
    // Enter로 선택
    fireEvent.keyDown(button.parentElement!, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('popular');
  });
});
