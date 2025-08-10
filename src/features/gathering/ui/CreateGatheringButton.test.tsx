import React, { Suspense } from 'react';
import { TestWrapper } from '@/shared/lib/test/testUtils';
import { fireEvent, render, screen } from '@testing-library/react';
import { CreateGatheringButton } from './CreateGatheringButton';

// Mock next/dynamic
jest.mock('next/dynamic', () => {
  return jest.fn((importFunc) => {
    // 테스트에서 사용하는 컴포넌트들을 직접 반환
    if (importFunc.toString().includes('CreateGatheringModal')) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { CreateGatheringModal } = require('./CreateGatheringModal');
      return CreateGatheringModal;
    }
    if (importFunc.toString().includes('Modal.Root')) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { Modal } = require('@/shared/ui/modal');
      return Modal.Root;
    }
    if (importFunc.toString().includes('Modal.Body')) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { Modal } = require('@/shared/ui/modal');
      return Modal.Body;
    }
    // 기본적으로는 빈 div 반환
    return function DynamicPlaceholder() {
      return <div data-testid="dynamic-placeholder" />;
    };
  });
});

// Mock next-auth/react
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'pages.gatherings.createButton': '모임 만들기',
      'pages.gatherings.loginRequired': '로그인이 필요합니다',
      'pages.gatherings.loginButton': '로그인하기',
    };
    return translations[key] || key;
  },
}));

// Mock i18n router
jest.mock('@/i18n', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

// Mock routes
jest.mock('@/shared/config/routes', () => ({
  ROUTES: {
    SIGNIN: '/signin',
  },
}));

// Mock CreateGatheringModal
jest.mock('./CreateGatheringModal', () => ({
  CreateGatheringModal: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
    <div
      data-testid="create-gathering-modal"
      data-open={isOpen}
    >
      <button onClick={onClose}>닫기</button>
    </div>
  ),
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
            <button
              onClick={onClose}
              data-testid="modal-close"
            >
              모달 닫기
            </button>
          </div>
        )}
      </div>
    ),
    Body: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="modal-body">{children}</div>
    ),
  },
}));

// Mock Button
jest.mock('@/shared/ui/button', () => ({
  Button: ({
    children,
    onClick,
    className,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
  }) => (
    <button
      data-testid="button"
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  ),
}));

describe('CreateGatheringButton', () => {
  const mockUseSession = jest.requireMock('next-auth/react').useSession;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('로그인된 사용자가 버튼을 클릭하면 모임 생성 모달이 열려야 한다', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: '테스트 사용자' } },
      status: 'authenticated',
    });

    render(
      <TestWrapper>
        <Suspense fallback={<div>Loading...</div>}>
          <CreateGatheringButton />
        </Suspense>
      </TestWrapper>,
    );

    const button = screen.getByTestId('button');
    fireEvent.click(button);

    const modal = screen.getByTestId('create-gathering-modal');
    expect(modal).toHaveAttribute('data-open', 'true');
  });

  it('로그인되지 않은 사용자가 버튼을 클릭하면 로그인 팝업이 표시되어야 한다', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });

    render(
      <TestWrapper>
        <CreateGatheringButton />
      </TestWrapper>,
    );

    const button = screen.getByTestId('button');
    fireEvent.click(button);

    const modalRoot = screen.getByTestId('modal-root');
    expect(modalRoot).toHaveAttribute('data-open', 'true');
    expect(screen.getByText('loginRequired')).toBeInTheDocument();
  });

  it('로딩 중일 때는 버튼 클릭이 무시되어야 한다', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'loading',
    });

    render(
      <TestWrapper>
        <CreateGatheringButton />
      </TestWrapper>,
    );

    const button = screen.getByTestId('button');
    fireEvent.click(button);

    // 모달이나 팝업이 열리지 않아야 함
    expect(screen.queryByTestId('create-gathering-modal')).not.toBeInTheDocument();
    expect(screen.queryByTestId('modal-root')).not.toBeInTheDocument();
  });

  it('로그인 팝업에서 로그인 버튼을 클릭하면 로그인 페이지로 이동해야 한다', () => {
    const mockPush = jest.fn();
    mockUseSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });

    // Mock router
    jest.requireMock('@/i18n').useRouter.mockReturnValue({
      push: mockPush,
    });

    render(
      <TestWrapper>
        <CreateGatheringButton />
      </TestWrapper>,
    );

    const button = screen.getByTestId('button');
    fireEvent.click(button);

    const loginButton = screen.getByText('loginButton');
    fireEvent.click(loginButton);

    expect(mockPush).toHaveBeenCalledWith('/signin');
  });

  it('모임 생성 모달을 닫을 수 있어야 한다', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: '테스트 사용자' } },
      status: 'authenticated',
    });

    render(
      <TestWrapper>
        <CreateGatheringButton />
      </TestWrapper>,
    );

    const button = screen.getByTestId('button');
    fireEvent.click(button);

    const modal = screen.getByTestId('create-gathering-modal');
    expect(modal).toHaveAttribute('data-open', 'true');

    const closeButton = screen.getByText('닫기');
    fireEvent.click(closeButton);

    expect(screen.queryByTestId('create-gathering-modal')).not.toBeInTheDocument();
  });

  it('로그인 팝업을 닫을 수 있어야 한다', () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });

    render(
      <TestWrapper>
        <CreateGatheringButton />
      </TestWrapper>,
    );

    const button = screen.getByTestId('button');
    fireEvent.click(button);

    const modalRoot = screen.getByTestId('modal-root');
    expect(modalRoot).toHaveAttribute('data-open', 'true');

    const closeButton = screen.getByTestId('modal-close');
    fireEvent.click(closeButton);

    expect(screen.queryByTestId('modal-root')).not.toBeInTheDocument();
  });

  it('버튼에 올바른 텍스트가 표시되어야 한다', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: '테스트 사용자' } },
      status: 'authenticated',
    });

    render(
      <TestWrapper>
        <CreateGatheringButton />
      </TestWrapper>,
    );

    expect(screen.getByText('createButton')).toBeInTheDocument();
  });

  it('버튼에 올바른 CSS 클래스가 적용되어야 한다', () => {
    mockUseSession.mockReturnValue({
      data: { user: { id: '1', name: '테스트 사용자' } },
      status: 'authenticated',
    });

    render(
      <TestWrapper>
        <CreateGatheringButton />
      </TestWrapper>,
    );

    const button = screen.getByTestId('button');
    expect(button).toHaveClass('font-bold');
  });
});
