import React from 'react';
import { render, screen } from '@testing-library/react';
import { InfiniteScrollObserver } from './InfiniteScrollObserver';

const observe = jest.fn();
const unobserve = jest.fn();
const disconnect = jest.fn();

beforeEach(() => {
  observe.mockClear();
  unobserve.mockClear();
  disconnect.mockClear();

  // window.IntersectionObserver를 '클래스 생성자'로 모킹합니다.
  window.IntersectionObserver = jest.fn(() => ({
    observe,
    unobserve,
    disconnect,
    root: null,
    rootMargin: '',
    thresholds: [],
    takeRecords: jest.fn(() => []),
  }));
});

describe('InfiniteScrollObserver', () => {
  // IntersectionObserver의 콜백을 가져오는 헬퍼 함수
  const getObserverCallback = () => (window.IntersectionObserver as jest.Mock).mock.calls[0][0];

  it('ref가 화면에 보이면 onFetchNextPage를 호출한다', () => {
    const onFetchNextPage = jest.fn();
    render(
      <InfiniteScrollObserver
        onFetchNextPage={onFetchNextPage}
        hasNextPage={true}
        isFetchingNextPage={false}
      />,
    );

    // observer 콜백을 수동으로 호출하여 'isIntersecting' 상태를 시뮬레이션
    const callback = getObserverCallback();
    callback([{ isIntersecting: true }]);

    expect(onFetchNextPage).toHaveBeenCalledTimes(1);
  });

  it('hasNextPage가 false이면, ref가 화면에 보여도 onFetchNextPage를 호출하지 않는다', () => {
    const onFetchNextPage = jest.fn();
    render(
      <InfiniteScrollObserver
        onFetchNextPage={onFetchNextPage}
        hasNextPage={false} // 조건: 다음 페이지 없음
        isFetchingNextPage={false}
      />,
    );

    const callback = getObserverCallback();
    callback([{ isIntersecting: true }]);

    expect(onFetchNextPage).not.toHaveBeenCalled();
  });

  it('isFetchingNextPage가 true이면, ref가 화면에 보여도 onFetchNextPage를 호출하지 않는다', () => {
    const onFetchNextPage = jest.fn();
    render(
      <InfiniteScrollObserver
        onFetchNextPage={onFetchNextPage}
        hasNextPage={true}
        isFetchingNextPage={true} // 조건: 다음 페이지 로딩 중
      />,
    );

    const callback = getObserverCallback();
    callback([{ isIntersecting: true }]);

    expect(onFetchNextPage).not.toHaveBeenCalled();
  });

  it('hasNextPage가 false이면 endMessage가 렌더링된다', () => {
    const endMessageText = '모든 데이터를 불러왔습니다.';
    render(
      <InfiniteScrollObserver
        onFetchNextPage={jest.fn()}
        hasNextPage={false}
        isFetchingNextPage={false}
        endMessage={<div>{endMessageText}</div>}
      />,
    );

    expect(screen.getByText(endMessageText)).toBeInTheDocument();
  });

  it('컴포넌트가 렌더링되면 요소를 observe한다', () => {
    render(
      <InfiniteScrollObserver
        onFetchNextPage={jest.fn()}
        hasNextPage={true}
        isFetchingNextPage={false}
      />,
    );

    expect(observe).toHaveBeenCalledTimes(1);
  });

  it('컴포넌트가 언마운트되면 observer를 disconnect한다', () => {
    const { unmount } = render(
      <InfiniteScrollObserver
        onFetchNextPage={jest.fn()}
        hasNextPage={true}
        isFetchingNextPage={false}
      />,
    );

    // 컴포넌트를 언마운트하면 useEffect의 cleanup 함수가 호출됨
    unmount();

    expect(disconnect).toHaveBeenCalledTimes(1);
  });
});
