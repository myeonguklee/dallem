import { render, screen } from '@testing-library/react';
import { Skeleton } from './Skeleton';

jest.mock('@/shared/lib', () => ({
  cn: (...args: string[]) => args.filter(Boolean).join(' '),
}));

describe('Skeleton Component', () => {
  // 1. 기본 렌더링 테스트
  test('should render successfully', () => {
    render(<Skeleton data-testid="skeleton" />);

    const skeletonElement = screen.getByTestId('skeleton');
    expect(skeletonElement).toBeInTheDocument();
  });

  // 2. 기본 클래스 적용 테스트
  test('should have default base classes', () => {
    render(<Skeleton data-testid="skeleton" />);

    const skeletonElement = screen.getByTestId('skeleton');

    // jest-dom의 toHaveClass 매처를 사용하여 여러 클래스를 한 번에 검사
    expect(skeletonElement).toHaveClass('animate-pulse rounded-md bg-gray-200');
  });

  // 3. 추가 className 병합 테스트
  test('should merge additional classes from className prop', () => {
    const customClass = 'w-full h-8';
    render(
      <Skeleton
        data-testid="skeleton"
        className={customClass}
      />,
    );

    const skeletonElement = screen.getByTestId('skeleton');

    // 기본 클래스 중 하나가 여전히 존재하는지 확인
    expect(skeletonElement).toHaveClass('animate-pulse');
    // 전달된 커스텀 클래스가 존재하는지 확인
    expect(skeletonElement).toHaveClass(customClass);
  });

  // 4. 기타 속성 전달 테스트
  test('should forward other HTML attributes to the div element', () => {
    render(
      <Skeleton
        data-testid="skeleton"
        id="my-skeleton"
      />,
    );

    const skeletonElement = screen.getByTestId('skeleton');

    // id 속성이 올바르게 적용되었는지 확인
    expect(skeletonElement).toHaveAttribute('id', 'my-skeleton');
  });
});
