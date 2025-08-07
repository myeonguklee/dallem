import { render, screen, within } from '@testing-library/react';
import { GatheringDetailSkeleton } from './GatheringDetailSkeleton';

// 1. Skeleton 컴포넌트를 간단한 div로 모킹
jest.mock('@/shared/ui/skeleton', () => ({
  Skeleton: ({ className }: { className?: string }) => (
    <div
      data-testid="skeleton-element"
      className={className}
    />
  ),
}));

describe('GatheringDetailSkeleton', () => {
  beforeEach(() => {
    // 각 테스트가 실행되기 전에 컴포넌트를 렌더링
    render(<GatheringDetailSkeleton />);
  });

  // 스모크 테스트: 컴포넌트가 에러 없이 렌더링되는지 확인
  it('정상적으로 렌더링되어야 한다.', () => {
    const skeletonComponent = screen.getByRole('status', {
      name: '모임 상세 정보 로딩 중',
    });
    expect(skeletonComponent).toBeInTheDocument();
  });

  // 주요 섹션들이 모두 렌더링되는지 확인
  it('상단 섹션과 리뷰 섹션을 포함', () => {
    const topSection = screen.getByTestId('top-section');
    const reviewSection = screen.getByTestId('review-section');

    expect(topSection).toBeInTheDocument();
    expect(reviewSection).toBeInTheDocument();
  });

  // 상단 섹션의 세부 구조를 테스트
  it('상단 섹션은 배너와 정보 영역의 스켈레톤을 포함', () => {
    // top-section 내부에서만 쿼리하여 범위를 좁힌다
    const topSection = screen.getByTestId('top-section');

    // 배너 영역에는 1개의 스켈레톤 요소가 있다.
    const bannerSkeleton = within(topSection).getAllByTestId('skeleton-element')[0];
    expect(bannerSkeleton).toHaveClass('h-full w-full'); // 중요한 클래스 정도는 확인 가능

    const infoSection = within(topSection).getByTestId('info-section');
    expect(infoSection).toBeInTheDocument();

    // 정보 영역 내부에 여러 개의 스켈레톤 요소가 있는지 확인
    const infoSkeletons = within(infoSection).getAllByTestId('skeleton-element');
    expect(infoSkeletons.length).toBeGreaterThan(5); // 코드에 있는 개수보다 적게 잡아 안정성 확보
  });

  // 리뷰 섹션의 세부 구조를 테스트
  it('리뷰 섹션은 제목과 2개의 리뷰 카드 스켈레톤을 포함해야 합니다.', () => {
    const reviewSection = screen.getByTestId('review-section');

    // reviewSection 내부의 모든 스켈레톤 요소를 배열로 가져온다.
    const allSkeletons = within(reviewSection).getAllByTestId('skeleton-element');

    // 1. 총 스켈레톤 개수를 확인하여 구조의 무결성을 검증
    // 제목(1) + 리뷰카드1(3) + 리뷰카드2(3) = 총 7개
    expect(allSkeletons).toHaveLength(7);

    // 2. 첫 번째 요소가 제목 스켈레톤인지 확인 (DOM 구조에 기반)
    const titleSkeleton = allSkeletons[0];
    expect(titleSkeleton).toHaveClass('mb-6 h-6 w-24');
  });
});
