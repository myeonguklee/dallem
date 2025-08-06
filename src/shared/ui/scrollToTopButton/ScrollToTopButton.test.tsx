import { fireEvent, render, screen } from '@testing-library/react';
import { ScrollToTopButton } from './ScrollToTopButton';

describe('', () => {
  beforeEach(() => {
    // 내장 객체를 수정하기 , 모든 테스트 시작전에 모든 스크롤 값을 0 으로 초기화
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0,
    });

    window.scroll = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('초기에는 버튼이 보이지 않는다. ', () => {
    render(<ScrollToTopButton />);
    const TopBtn = screen.queryByLabelText('페이지 상단으로 이동');

    expect(TopBtn).toBeInTheDocument();
    expect(TopBtn).toHaveClass('opacity-0');
  });

  it('스크롤이 300px 넘어가면 버튼이 보인다. ', async () => {
    render(<ScrollToTopButton />);
    const TopBtn = screen.getByLabelText('페이지 상단으로 이동');

    // 트리거가 눌렸을때, 판단할 값으로 미리 변경
    window.scrollY = 350;
    fireEvent.scroll(window);

    expect(TopBtn).toHaveClass('opacity-100');
  });

  it('버튼 클릭 시 window.scroll이 호출된다', () => {
    render(<ScrollToTopButton />);
    const TopBtn = screen.getByLabelText('페이지 상단으로 이동');

    window.scrollY = 400;
    fireEvent.scroll(window);
    fireEvent.click(TopBtn);

    expect(window.scroll).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
    expect(window.scroll).toHaveBeenCalledTimes(1);
  });
});
