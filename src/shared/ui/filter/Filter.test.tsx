import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Filter } from './Filter';

const mockOptions = [
  { label: '전체보기', value: 'all' },
  { label: '건대입구', value: '건대입구' },
  { label: '을지로3가', value: '을지로3가' },
  { label: '신림', value: '신림' },
];

const defaultProps = {
  options: mockOptions,
  selected: 'all',
  onChange: jest.fn(),
  allValue: 'all',
};

describe('Filter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('기본 렌더링이 올바르게 되어야 한다', () => {
    render(<Filter {...defaultProps} />);

    expect(screen.getByText('전체보기')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('전체보기 선택 시 흰색 배경이어야 한다', () => {
    render(
      <Filter
        {...defaultProps}
        selected="all"
      />,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-white');
    expect(button).toHaveClass('text-[var(--color-font-base)]');
  });

  it('특정 옵션 선택 시 검정색 배경이어야 한다', () => {
    render(
      <Filter
        {...defaultProps}
        selected="건대입구"
      />,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-black');
    expect(button).toHaveClass('text-white');
  });

  it('버튼 클릭 시 드롭다운이 열려야 한다', async () => {
    const user = userEvent.setup();
    render(<Filter {...defaultProps} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(screen.getByText('건대입구')).toBeInTheDocument();
    expect(screen.getByText('을지로3가')).toBeInTheDocument();
    expect(screen.getByText('신림')).toBeInTheDocument();
  });

  it('옵션 클릭 시 onChange가 호출되어야 한다', async () => {
    const mockOnChange = jest.fn();
    const user = userEvent.setup();
    render(
      <Filter
        {...defaultProps}
        onChange={mockOnChange}
      />,
    );

    const button = screen.getByRole('button');
    await user.click(button);

    const option = screen.getByText('건대입구');
    await user.click(option);

    expect(mockOnChange).toHaveBeenCalledWith('건대입구');
  });

  it('ESC 키를 누르면 드롭다운이 닫혀야 한다', async () => {
    const user = userEvent.setup();
    render(<Filter {...defaultProps} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(screen.getByText('건대입구')).toBeInTheDocument();

    await user.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.queryByText('건대입구')).not.toBeInTheDocument();
    });
  });

  it('화살표 키로 옵션을 탐색할 수 있어야 한다', async () => {
    const user = userEvent.setup();
    render(<Filter {...defaultProps} />);

    const button = screen.getByRole('button');
    await user.click(button);

    // 다음 옵션으로 이동
    await user.keyboard('{ArrowDown}');
    expect(screen.getByText('건대입구')).toHaveFocus();
  });

  it('Enter 키로 옵션을 선택할 수 있어야 한다', async () => {
    const mockOnChange = jest.fn();
    const user = userEvent.setup();
    render(
      <Filter
        {...defaultProps}
        onChange={mockOnChange}
      />,
    );

    const button = screen.getByRole('button');
    await user.click(button);

    // 첫 번째 옵션으로 이동
    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Enter}');

    expect(mockOnChange).toHaveBeenCalledWith('건대입구');
  });

  it('Space 키로 옵션을 선택할 수 있어야 한다', async () => {
    const mockOnChange = jest.fn();
    const user = userEvent.setup();
    render(
      <Filter
        {...defaultProps}
        onChange={mockOnChange}
      />,
    );

    const button = screen.getByRole('button');
    await user.click(button);

    // 다음 옵션으로 이동
    await user.keyboard('{ArrowDown}');
    await user.keyboard(' ');

    expect(mockOnChange).toHaveBeenCalledWith('건대입구');
  });

  it('바깥 클릭 시 드롭다운이 닫혀야 한다', async () => {
    const user = userEvent.setup();
    render(<Filter {...defaultProps} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(screen.getByText('건대입구')).toBeInTheDocument();

    // 바깥 클릭
    fireEvent.mouseDown(document.body);

    await waitFor(() => {
      expect(screen.queryByText('건대입구')).not.toBeInTheDocument();
    });
  });

  it('커스텀 allValue를 사용할 수 있어야 한다', () => {
    const customProps = {
      ...defaultProps,
      allValue: '전체',
      selected: '전체',
    };

    render(<Filter {...customProps} />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-white');
  });

  it('className prop이 올바르게 적용되어야 한다', () => {
    render(
      <Filter
        {...defaultProps}
        className="custom-class"
      />,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('선택된 옵션이 올바르게 표시되어야 한다', () => {
    render(
      <Filter
        {...defaultProps}
        selected="건대입구"
      />,
    );

    expect(screen.getByText('건대입구')).toBeInTheDocument();
  });

  it('드롭다운에서 선택된 옵션이 강조되어야 한다', async () => {
    const user = userEvent.setup();
    render(
      <Filter
        {...defaultProps}
        selected="건대입구"
      />,
    );

    const button = screen.getByRole('button');
    await user.click(button);

    const selectedOption = screen.getAllByText('건대입구')[1];
    expect(selectedOption).toHaveClass('font-bold');
    expect(selectedOption).toHaveClass('text-[var(--semantic-color-primary)]');
  });
});
