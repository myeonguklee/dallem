import { TestWrapper, createMockUser } from '@/shared/lib/test/testUtils';
import { render, screen } from '@testing-library/react';
import { ProfileSection } from './ProfileSection';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

// Mock API
jest.mock('@/entities/user/api/queries', () => ({
  useGetUser: jest.fn(),
}));

// Mock ProfileEditBtn
jest.mock('@/features/my-page/ui', () => ({
  ProfileEditBtn: ({ companyName, email }: { companyName: string; email: string }) => (
    <button
      data-testid="profile-edit-btn"
      data-company={companyName}
      data-email={email}
    >
      프로필 편집
    </button>
  ),
}));

// Mock ProfileImage
jest.mock('@/shared/ui/ProfileImage', () => ({
  ProfileImage: ({ url, size, className }: { url?: string; size: number; className?: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      data-testid="profile-image"
      src={url}
      alt="프로필 이미지"
      data-size={size}
      className={className}
    />
  ),
}));

// Mock ProfileBGIcon
jest.mock('@/shared/ui/icon', () => ({
  ProfileBGIcon: ({ className }: { className?: string }) => (
    <div
      data-testid="profile-bg-icon"
      className={className}
    >
      배경 아이콘
    </div>
  ),
}));

describe('ProfileSection', () => {
  const mockUseGetUser = jest.requireMock('@/entities/user/api/queries').useGetUser;

  const defaultUser = createMockUser({
    id: 1,
    name: '홍길동',
    email: 'hong@example.com',
    companyName: '테스트 회사',
    image: 'https://example.com/profile.jpg',
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('사용자 데이터가 로딩 중일 때 기본 구조가 렌더링되어야 한다', () => {
    mockUseGetUser.mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    render(
      <TestWrapper>
        <ProfileSection />
      </TestWrapper>,
    );

    // 기본 구조 확인
    expect(screen.getByText('profile.title')).toBeInTheDocument();
    expect(screen.getByTestId('profile-bg-icon')).toBeInTheDocument();
    expect(screen.getByTestId('profile-edit-btn')).toBeInTheDocument();
  });

  it('사용자 데이터가 있을 때 모든 정보가 올바르게 표시되어야 한다', () => {
    mockUseGetUser.mockReturnValue({
      data: defaultUser,
      isLoading: false,
    });

    render(
      <TestWrapper>
        <ProfileSection />
      </TestWrapper>,
    );

    // 제목 확인
    expect(screen.getByText('profile.title')).toBeInTheDocument();

    // 사용자 정보 확인
    expect(screen.getByText('홍길동')).toBeInTheDocument();
    expect(screen.getByText('테스트 회사')).toBeInTheDocument();
    expect(screen.getByText('hong@example.com')).toBeInTheDocument();

    // 라벨 확인
    expect(screen.getByText('profile.company')).toBeInTheDocument();
    expect(screen.getByText('profile.email')).toBeInTheDocument();

    // 프로필 이미지 확인
    const profileImage = screen.getByTestId('profile-image');
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute('src', 'https://example.com/profile.jpg');
    expect(profileImage).toHaveAttribute('data-size', '56');
    expect(profileImage).toHaveClass('-translate-y-3');
  });

  it('사용자 데이터가 없을 때 기본값이 표시되어야 한다', () => {
    mockUseGetUser.mockReturnValue({
      data: null,
      isLoading: false,
    });

    render(
      <TestWrapper>
        <ProfileSection />
      </TestWrapper>,
    );

    // 제목은 여전히 표시되어야 함
    expect(screen.getByText('profile.title')).toBeInTheDocument();

    // 사용자 정보는 빈 값으로 표시되어야 함
    expect(screen.getByText('profile.company')).toBeInTheDocument();
    expect(screen.getByText('profile.email')).toBeInTheDocument();

    // ProfileEditBtn에 빈 문자열이 전달되어야 함
    const editBtn = screen.getByTestId('profile-edit-btn');
    expect(editBtn).toHaveAttribute('data-company', '');
    expect(editBtn).toHaveAttribute('data-email', '');
  });

  it('사용자 데이터의 일부 필드가 없을 때 올바르게 처리되어야 한다', () => {
    const partialUser = {
      id: 1,
      name: '홍길동',
      // email과 companyName이 없는 경우
    };

    mockUseGetUser.mockReturnValue({
      data: partialUser,
      isLoading: false,
    });

    render(
      <TestWrapper>
        <ProfileSection />
      </TestWrapper>,
    );

    // 이름은 표시되어야 함
    expect(screen.getByText('홍길동')).toBeInTheDocument();

    // 회사명과 이메일은 빈 값으로 표시되어야 함
    expect(screen.getByText('profile.company')).toBeInTheDocument();
    expect(screen.getByText('profile.email')).toBeInTheDocument();

    // ProfileEditBtn에 빈 문자열이 전달되어야 함
    const editBtn = screen.getByTestId('profile-edit-btn');
    expect(editBtn).toHaveAttribute('data-company', '');
    expect(editBtn).toHaveAttribute('data-email', '');
  });

  it('ProfileEditBtn에 올바른 props가 전달되어야 한다', () => {
    mockUseGetUser.mockReturnValue({
      data: defaultUser,
      isLoading: false,
    });

    render(
      <TestWrapper>
        <ProfileSection />
      </TestWrapper>,
    );

    const editBtn = screen.getByTestId('profile-edit-btn');
    expect(editBtn).toHaveAttribute('data-company', '테스트 회사');
    expect(editBtn).toHaveAttribute('data-email', 'hong@example.com');
  });

  it('컴포넌트가 올바르게 렌더링되어야 한다', () => {
    mockUseGetUser.mockReturnValue({
      data: defaultUser,
      isLoading: false,
    });

    render(
      <TestWrapper>
        <ProfileSection />
      </TestWrapper>,
    );

    // 기본 구조 확인
    expect(screen.getByText('profile.title')).toBeInTheDocument();
    expect(screen.getByTestId('profile-bg-icon')).toBeInTheDocument();
    expect(screen.getByTestId('profile-edit-btn')).toBeInTheDocument();
    expect(screen.getByTestId('profile-image')).toBeInTheDocument();

    // 사용자 정보 확인
    expect(screen.getByText('홍길동')).toBeInTheDocument();
    expect(screen.getByText('테스트 회사')).toBeInTheDocument();
    expect(screen.getByText('hong@example.com')).toBeInTheDocument();
  });

  it('ProfileBGIcon이 올바른 클래스를 가져야 한다', () => {
    mockUseGetUser.mockReturnValue({
      data: defaultUser,
      isLoading: false,
    });

    render(
      <TestWrapper>
        <ProfileSection />
      </TestWrapper>,
    );

    const bgIcon = screen.getByTestId('profile-bg-icon');
    expect(bgIcon).toHaveClass('self-end');
  });
});
