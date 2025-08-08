import { TestWrapper } from '@/shared/lib/test/testUtils';
import { render, screen } from '@testing-library/react';
import { CreateGatheringModal } from './CreateGatheringModal';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'pages.gatherings.create.title': '모임 만들기',
    };
    return translations[key] || key;
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

// Mock CreateGatheringForm
jest.mock('./CreateGatheringForm', () => ({
  CreateGatheringForm: ({ onClose }: { onClose: () => void }) => (
    <div data-testid="create-gathering-form">
      <button onClick={onClose}>폼 닫기</button>
    </div>
  ),
}));

describe('CreateGatheringModal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('모달이 열려있을 때 올바르게 렌더링되어야 한다', () => {
    render(
      <TestWrapper>
        <CreateGatheringModal
          isOpen={true}
          onClose={mockOnClose}
        />
      </TestWrapper>,
    );

    expect(screen.getByTestId('modal-root')).toHaveAttribute('data-open', 'true');
    expect(screen.getByTestId('modal-header')).toBeInTheDocument();
    expect(screen.getByTestId('modal-body')).toBeInTheDocument();
    expect(screen.getByTestId('create-gathering-form')).toBeInTheDocument();
    expect(screen.getByText('title')).toBeInTheDocument();
  });

  it('모달이 닫혀있을 때는 렌더링되지 않아야 한다', () => {
    render(
      <TestWrapper>
        <CreateGatheringModal
          isOpen={false}
          onClose={mockOnClose}
        />
      </TestWrapper>,
    );

    expect(screen.getByTestId('modal-root')).toHaveAttribute('data-open', 'false');
    expect(screen.queryByTestId('modal-header')).not.toBeInTheDocument();
    expect(screen.queryByTestId('modal-body')).not.toBeInTheDocument();
    expect(screen.queryByTestId('create-gathering-form')).not.toBeInTheDocument();
  });

  it('모달 닫기 버튼을 클릭하면 onClose가 호출되어야 한다', () => {
    render(
      <TestWrapper>
        <CreateGatheringModal
          isOpen={true}
          onClose={mockOnClose}
        />
      </TestWrapper>,
    );

    const closeButton = screen.getByText('모달 닫기');
    closeButton.click();

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('폼 닫기 버튼을 클릭하면 onClose가 호출되어야 한다', () => {
    render(
      <TestWrapper>
        <CreateGatheringModal
          isOpen={true}
          onClose={mockOnClose}
        />
      </TestWrapper>,
    );

    const formCloseButton = screen.getByText('폼 닫기');
    formCloseButton.click();

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
