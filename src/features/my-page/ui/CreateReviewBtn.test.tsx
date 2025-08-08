import { CreateReviewPayload } from '@/entities/review/model/schema';
import { TestWrapper } from '@/shared/lib/test/testUtils';
import { fireEvent, render, screen } from '@testing-library/react';
import { CreateReviewBtn } from './CreateReviewBtn';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'pages.myPage.reviewModal.button': '리뷰 작성하기',
      'pages.myPage.reviewModal.title': '리뷰 쓰기',
      'pages.myPage.reviewModal.success': '리뷰가 성공적으로 작성되었습니다!',
    };
    return translations[key] || key;
  },
}));

// Mock review API
jest.mock('@/entities/review/api/queries', () => ({
  useCreateReview: jest.fn(),
}));

// Mock react-hot-toast (named export toast)
jest.mock('react-hot-toast', () => ({
  __esModule: true,
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock Modal
jest.mock('@/shared/ui/modal', () => ({
  Modal: {
    Root: ({
      children,
      isOpen,
      onClose,
    }: {
      children: React.ReactNode;
      isOpen: boolean;
      onClose: () => void;
    }) => (
      <div
        data-testid="modal-root"
        data-open={isOpen}
      >
        {isOpen && (
          <div>
            {children}
            <button onClick={onClose}>모달 닫기</button>
          </div>
        )}
      </div>
    ),
    Header: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="modal-header">{children}</div>
    ),
    Body: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="modal-body">{children}</div>
    ),
  },
}));

// Mock Button
jest.mock('@/shared/ui/button', () => ({
  Button: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button
      data-testid="button"
      onClick={onClick}
    >
      {children}
    </button>
  ),
}));

// Mock CreateReviewForm
jest.mock('@/entities/review/ui', () => ({
  CreateReviewForm: ({
    gatheringId,
    onSubmit,
    onCancel,
    isSubmitting,
  }: {
    gatheringId: number;
    onSubmit: (p: CreateReviewPayload) => void;
    onCancel: () => void;
    isSubmitting?: boolean;
  }) => (
    <div data-testid="create-review-form">
      <button
        onClick={() => onSubmit({ gatheringId, score: 5, comment: '좋아요' })}
        disabled={isSubmitting}
      >
        제출
      </button>
      <button onClick={onCancel}>취소</button>
    </div>
  ),
}));

describe('CreateReviewBtn', () => {
  const mockUseCreateReview = jest.requireMock('@/entities/review/api/queries')
    .useCreateReview as jest.Mock;
  const mockToast = jest.requireMock('react-hot-toast').toast;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCreateReview.mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
    });
  });

  it('버튼 클릭 시 모달이 열려야 한다', () => {
    render(
      <TestWrapper>
        <CreateReviewBtn gatheringId={1} />
      </TestWrapper>,
    );

    fireEvent.click(screen.getByTestId('button'));

    expect(screen.getByTestId('modal-root')).toHaveAttribute('data-open', 'true');
    expect(screen.getByTestId('modal-header')).toBeInTheDocument();
    expect(screen.getByTestId('create-review-form')).toBeInTheDocument();
  });

  it('리뷰 제출 성공 시 토스트 표시 및 모달 닫힘', () => {
    const mutate = jest.fn((data, opts) => opts?.onSuccess && opts.onSuccess());
    mockUseCreateReview.mockReturnValue({ mutate, isPending: false });

    render(
      <TestWrapper>
        <CreateReviewBtn gatheringId={99} />
      </TestWrapper>,
    );

    // 열기
    fireEvent.click(screen.getByTestId('button'));

    // 제출
    fireEvent.click(screen.getByText('제출'));

    expect(mutate).toHaveBeenCalledWith(
      { gatheringId: 99, score: 5, comment: '좋아요' },
      expect.any(Object),
    );

    expect(mockToast.success).toHaveBeenCalled();
  });

  it('취소 버튼으로 모달 닫을 수 있어야 한다', () => {
    render(
      <TestWrapper>
        <CreateReviewBtn gatheringId={1} />
      </TestWrapper>,
    );

    fireEvent.click(screen.getByTestId('button'));
    expect(screen.getByTestId('modal-root')).toHaveAttribute('data-open', 'true');
  });
});
