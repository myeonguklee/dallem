import {
  TestWrapper,
  createMockGathering,
  createMockSession,
  createMockUser,
} from '@/shared/lib/test/testUtils';
import { MyPageGatheringCardProps } from '@/widgets/GatheringCard/ui/MyPageGatheringCard';
import { render, screen, waitFor } from '@testing-library/react';
import { GatheringsCreatedContent } from './GatheringsCreatedContent';

// NextAuth 세션 mock
const mockUseSession = jest.fn();
const mockGetSession = jest.fn();
jest.mock('next-auth/react', () => ({
  useSession: () => mockUseSession(),
  getSession: () => mockGetSession(),
}));

// next-intl mock
const mockUseTranslations = jest.fn();
jest.mock('next-intl', () => ({
  useTranslations: () => mockUseTranslations(),
}));

// API 훅들 mock
const mockUseGetUser = jest.fn();
const mockUseGetGatherings = jest.fn();
jest.mock('@/entities/user/api', () => ({
  useGetUser: () => mockUseGetUser(),
}));
jest.mock('@/entities/gathering/api', () => ({
  useGetGatherings: () => mockUseGetGatherings(),
}));

// MyPageGatheringCard mock
jest.mock('@/widgets/GatheringCard/ui', () => ({
  MyPageGatheringCard: ({
    gatheringId,
    gatheringName,
    gatheringLocation,
    gatheringDateTime,
    gatheringParticipantCount,
    gatheringCapacity,
    gatheringImage,
    isCanceled,
    isActionButtonVisible,
  }: MyPageGatheringCardProps) => (
    <div data-testid="gathering-card">
      <div data-testid="gathering-id">{gatheringId}</div>
      <div data-testid="gathering-name">{gatheringName}</div>
      <div data-testid="gathering-location">{gatheringLocation}</div>
      <div data-testid="gathering-date">{gatheringDateTime.toISOString()}</div>
      <div data-testid="gathering-participants">
        {gatheringParticipantCount}/{gatheringCapacity}
      </div>
      <div data-testid="gathering-image">{gatheringImage}</div>
      <div data-testid="gathering-canceled">{isCanceled ? 'canceled' : 'active'}</div>
      <div data-testid="action-button-visible">{isActionButtonVisible ? 'visible' : 'hidden'}</div>
    </div>
  ),
}));

describe('GatheringsCreatedContent', () => {
  beforeEach(() => {
    // 기본 mock 설정
    mockUseTranslations.mockReturnValue((key: string) => {
      const translations: Record<string, string> = {
        'gatherings.noCreatedGatherings': '생성한 모임이 없습니다',
      };
      return translations[key] || key;
    });

    // 기본 인증된 사용자 세션
    const mockSession = createMockSession();
    mockUseSession.mockReturnValue({
      data: mockSession,
      status: 'authenticated',
    });
    mockGetSession.mockResolvedValue(mockSession);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('사용자 정보와 모임 목록이 모두 있는 경우 모임 카드들을 렌더링한다', async () => {
    // Mock 데이터 설정
    const mockUser = createMockUser();
    const mockGatherings = [
      createMockGathering({ id: 1, name: '테스트 모임 1' }),
      createMockGathering({
        id: 2,
        name: '테스트 모임 2',
        location: 'BUSAN',
        participantCount: 3,
        capacity: 8,
      }),
    ];

    mockUseGetUser.mockReturnValue({
      data: mockUser,
      isLoading: false,
      error: null,
    });
    mockUseGetGatherings.mockReturnValue({
      data: mockGatherings,
      isLoading: false,
      error: null,
    });

    render(
      <TestWrapper>
        <GatheringsCreatedContent />
      </TestWrapper>,
    );

    // 모임 카드들이 렌더링되는지 확인
    await waitFor(() => {
      const gatheringCards = screen.getAllByTestId('gathering-card');
      expect(gatheringCards).toHaveLength(2);
    });

    // 첫 번째 모임 카드의 정보 확인
    const gatheringCards = screen.getAllByTestId('gathering-card');
    expect(gatheringCards[0]).toHaveTextContent('1');
    expect(gatheringCards[0]).toHaveTextContent('테스트 모임 1');
    expect(gatheringCards[0]).toHaveTextContent('SEOUL');
    expect(gatheringCards[0]).toHaveTextContent('5/10');
    expect(gatheringCards[0]).toHaveTextContent('https://example.com/gathering.jpg');
    expect(gatheringCards[0]).toHaveTextContent('active');
    expect(gatheringCards[0]).toHaveTextContent('hidden');
  });

  it('사용자는 있지만 생성한 모임이 없는 경우 빈 상태 메시지를 표시한다', async () => {
    // Mock 데이터 설정
    const mockUser = createMockUser();

    mockUseGetUser.mockReturnValue({
      data: mockUser,
      isLoading: false,
      error: null,
    });
    mockUseGetGatherings.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
    });

    render(
      <TestWrapper>
        <GatheringsCreatedContent />
      </TestWrapper>,
    );

    // 빈 상태 메시지가 표시되는지 확인
    await waitFor(() => {
      expect(screen.getByText('생성한 모임이 없습니다')).toBeInTheDocument();
    });

    // 모임 카드가 렌더링되지 않는지 확인
    expect(screen.queryByTestId('gathering-card')).not.toBeInTheDocument();
  });

  it('사용자 정보 로드에 실패한 경우 적절히 처리한다', async () => {
    mockUseGetUser.mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('사용자 정보 로드 실패'),
    });
    mockUseGetGatherings.mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });

    render(
      <TestWrapper>
        <GatheringsCreatedContent />
      </TestWrapper>,
    );

    // 에러 상태에서도 컴포넌트가 렌더링되는지 확인
    await waitFor(() => {
      expect(screen.getByText('생성한 모임이 없습니다')).toBeInTheDocument();
    });
  });

  it('모임 목록 로드에 실패한 경우 적절히 처리한다', async () => {
    const mockUser = createMockUser();

    mockUseGetUser.mockReturnValue({
      data: mockUser,
      isLoading: false,
      error: null,
    });
    mockUseGetGatherings.mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('모임 목록 로드 실패'),
    });

    render(
      <TestWrapper>
        <GatheringsCreatedContent />
      </TestWrapper>,
    );

    // 에러 상태에서도 컴포넌트가 렌더링되는지 확인
    await waitFor(() => {
      expect(screen.getByText('생성한 모임이 없습니다')).toBeInTheDocument();
    });
  });

  it('취소된 모임이 있는 경우 올바르게 표시한다', async () => {
    const mockUser = createMockUser();
    const mockCanceledGathering = [
      createMockGathering({
        name: '취소된 모임',
        participantCount: 0,
        canceledAt: '2024-01-10T10:00:00Z',
      }),
    ];

    mockUseGetUser.mockReturnValue({
      data: mockUser,
      isLoading: false,
      error: null,
    });
    mockUseGetGatherings.mockReturnValue({
      data: mockCanceledGathering,
      isLoading: false,
      error: null,
    });

    render(
      <TestWrapper>
        <GatheringsCreatedContent />
      </TestWrapper>,
    );

    // 취소된 모임이 올바르게 표시되는지 확인
    await waitFor(() => {
      const gatheringCards = screen.getAllByTestId('gathering-card');
      expect(gatheringCards).toHaveLength(1);
    });

    expect(screen.getByTestId('gathering-name')).toHaveTextContent('취소된 모임');
    expect(screen.getByTestId('gathering-canceled')).toHaveTextContent('canceled');
  });

  it('인증되지 않은 사용자의 경우 적절히 처리한다', () => {
    // 비인증 사용자 세션
    mockUseSession.mockReturnValue({
      data: null,
      status: 'unauthenticated',
    });
    mockGetSession.mockResolvedValue(null);

    mockUseGetUser.mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });
    mockUseGetGatherings.mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });

    render(
      <TestWrapper>
        <GatheringsCreatedContent />
      </TestWrapper>,
    );

    // 비인증 상태에서도 컴포넌트가 렌더링되는지 확인
    expect(screen.getByText('생성한 모임이 없습니다')).toBeInTheDocument();
  });

  it('로딩 상태일 때 적절히 처리한다', () => {
    mockUseGetUser.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });
    mockUseGetGatherings.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(
      <TestWrapper>
        <GatheringsCreatedContent />
      </TestWrapper>,
    );

    // 로딩 상태에서도 컴포넌트가 렌더링되는지 확인
    expect(screen.getByText('생성한 모임이 없습니다')).toBeInTheDocument();
  });
});
