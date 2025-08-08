import { TestWrapper } from '@/shared/lib/test/testUtils';
import { fireEvent, render, screen } from '@testing-library/react';
import { MyPageActionButton } from './MyPageActionButton';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      cancelReservation: '예약 취소하기',
    };
    return translations[key] || key;
  },
}));

// Mock useLeaveGathering
jest.mock('@/entities/gathering-detail/api/queries', () => ({
  useLeaveGathering: jest.fn(),
}));

// Mock Button
jest.mock('@/shared/ui/button', () => ({
  Button: ({
    children,
    onClick,
    className,
    variant,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    variant?: string;
  }) => (
    <button
      data-testid="button"
      data-variant={variant}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  ),
}));

// Mock CreateReviewBtn
jest.mock('@/features/my-page/ui', () => ({
  CreateReviewBtn: ({ gatheringId }: { gatheringId: number }) => (
    <div
      data-testid="create-review-btn"
      data-gid={gatheringId}
    >
      리뷰 버튼
    </div>
  ),
}));

describe('MyPageActionButton', () => {
  const mockUseLeaveGathering = jest.requireMock('@/entities/gathering-detail/api/queries')
    .useLeaveGathering as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseLeaveGathering.mockReturnValue({ mutate: jest.fn() });
  });

  it('미완료 상태에서는 예약 취소 버튼이 표시되고 클릭 시 leaveGathering 호출', () => {
    render(
      <TestWrapper>
        <MyPageActionButton
          gatheringId={7}
          isCompleted={false}
          isReviewed={false}
        />
      </TestWrapper>,
    );

    const cancelBtn = screen.getByText('예약 취소하기');
    expect(cancelBtn).toBeInTheDocument();

    fireEvent.click(cancelBtn);
    expect(mockUseLeaveGathering().mutate).toHaveBeenCalledWith(7);
  });

  it('완료되었고 리뷰 미작성 시 리뷰 버튼 렌더링', () => {
    render(
      <TestWrapper>
        <MyPageActionButton
          gatheringId={3}
          isCompleted={true}
          isReviewed={false}
        />
      </TestWrapper>,
    );

    expect(screen.getByTestId('create-review-btn')).toBeInTheDocument();
    expect(screen.queryByText('예약 취소하기')).not.toBeInTheDocument();
  });

  it('완료 및 리뷰 작성 시 아무 버튼도 렌더링되지 않음', () => {
    render(
      <TestWrapper>
        <MyPageActionButton
          gatheringId={3}
          isCompleted={true}
          isReviewed={true}
        />
      </TestWrapper>,
    );

    expect(screen.queryByTestId('create-review-btn')).not.toBeInTheDocument();
    expect(screen.queryByText('예약 취소하기')).not.toBeInTheDocument();
  });
});
