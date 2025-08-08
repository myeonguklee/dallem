import { TestWrapper } from '@/shared/lib/test/testUtils';
import { fireEvent, render, screen } from '@testing-library/react';
import { ProfileEditBtn } from './ProfileEditBtn';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'pages.myPage.profile.edit': '프로필 수정',
      'profile.edit': '프로필 수정',
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

// Mock EditIcon
jest.mock('@/shared/ui/icon', () => ({
  EditIcon: ({ className, onClick }: { className?: string; onClick?: () => void }) => (
    <button
      data-testid="edit-icon"
      className={className}
      onClick={onClick}
    >
      편집
    </button>
  ),
}));

// Mock ProfileEditForm
jest.mock('@/entities/user/ui', () => ({
  ProfileEditForm: ({
    companyName,
    email,
    onClose,
  }: {
    companyName: string;
    email: string;
    onClose: () => void;
  }) => (
    <div
      data-testid="profile-edit-form"
      data-company={companyName}
      data-email={email}
    >
      <button onClick={onClose}>폼 닫기</button>
    </div>
  ),
}));

describe('ProfileEditBtn', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('아이콘 클릭 시 모달이 열리고 헤더가 표시되어야 한다', () => {
    render(
      <TestWrapper>
        <ProfileEditBtn
          companyName="테스트 회사"
          email="test@example.com"
        />
      </TestWrapper>,
    );

    fireEvent.click(screen.getByTestId('edit-icon'));

    expect(screen.getByTestId('modal-root')).toHaveAttribute('data-open', 'true');
    expect(screen.getByTestId('modal-header')).toBeInTheDocument();
    const form = screen.getByTestId('profile-edit-form');
    expect(form).toHaveAttribute('data-company', '테스트 회사');
    expect(form).toHaveAttribute('data-email', 'test@example.com');
  });

  it('모달 onClose 또는 폼 onClose로 모달이 닫혀야 한다', () => {
    render(
      <TestWrapper>
        <ProfileEditBtn
          companyName="테스트 회사"
          email="test@example.com"
        />
      </TestWrapper>,
    );

    // 열기
    fireEvent.click(screen.getByTestId('edit-icon'));
    expect(screen.getByTestId('modal-root')).toHaveAttribute('data-open', 'true');

    // 폼 내부 닫기
    fireEvent.click(screen.getByText('폼 닫기'));
    expect(screen.getByTestId('modal-root')).toHaveAttribute('data-open', 'false');

    // 다시 열고 모달 닫기 버튼
    fireEvent.click(screen.getByTestId('edit-icon'));
    fireEvent.click(screen.getByText('모달 닫기'));
    expect(screen.getByTestId('modal-root')).toHaveAttribute('data-open', 'false');
  });
});
