import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';

describe('페이지네이션에 관한 테스트', () => {
  //가짜함수 만들기,
  const mockChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('페이지네이션의 버튼들이 모두 정상적으로 렌더링 되는가?  ', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockChange}
      />,
    );
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('현재페이지는 isActive 상태인가? ', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockChange}
      />,
    );

    const activeBtn = screen.getByText('3');
    expect(activeBtn).toHaveClass('text-[var(--color-font-base)]');
  });

  it('첫 페이지일때, 이전 버튼은 비활성화 상태인가? ', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockChange}
      />,
    );
    const prevBtn = screen.getByLabelText('이전 페이지');
    expect(prevBtn).toBeDisabled();
  });

  it('마지막 페이지일때, 다음 버튼은 비활성화 상태인가? ', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockChange}
      />,
    );
    const nextBtn = screen.getByLabelText('다음 페이지');
    expect(nextBtn).toBeDisabled();
  });

  it('버튼을 클릭하면, onPageChange가 호출되는가? ', async () => {
    const user = userEvent.setup();
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockChange}
      />,
    );

    const clickBtn = screen.getByText('3');
    await user.click(clickBtn);
    expect(mockChange).toHaveBeenCalled();
    expect(mockChange).toHaveBeenCalledTimes(1);
    expect(mockChange).toHaveBeenCalledWith(3);
  });

  it('페이지 번호가 많을때  ...이 나타나는가? ', () => {
    render(
      <Pagination
        currentPage={8}
        totalPages={15}
        onPageChange={mockChange}
      />,
    );
    expect(screen.getAllByText('...')).toHaveLength(2);
  });
});
