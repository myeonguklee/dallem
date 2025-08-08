import {
  TestWrapper,
  createMockGathering,
  createMockSession,
  createMockUser,
} from '@/shared/lib/test/testUtils';
import { ChipProps } from '@/shared/ui/chip';
import { MyPageGatheringCardProps } from '@/widgets/GatheringCard/ui/MyPageGatheringCard';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ReviewCardProps } from './ReviewCard';
import { ReviewsContent } from './ReviewsContent';

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
const mockUseGetGatheringsJoined = jest.fn();
const mockUseGetReviews = jest.fn();
jest.mock('@/entities/user/api', () => ({
  useGetUser: () => mockUseGetUser(),
}));
jest.mock('@/entities/gathering/api', () => ({
  useGetGatheringsJoined: () => mockUseGetGatheringsJoined(),
}));
jest.mock('@/entities/review/api/queries', () => ({
  useGetReviews: () => mockUseGetReviews(),
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
    isCompleted,
    isReviewed,
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
      <div data-testid="gathering-completed">{isCompleted ? 'completed' : 'ongoing'}</div>
      <div data-testid="gathering-reviewed">{isReviewed ? 'reviewed' : 'not-reviewed'}</div>
    </div>
  ),
}));

// ReviewCard mock
jest.mock('@/entities/review/ui', () => ({
  ReviewCard: ({
    score,
    comment,
    dateTime,
    userName,
    userImg,
    reviewImg,
    gatheringName,
    location,
  }: ReviewCardProps) => (
    <div data-testid="review-card">
      <div data-testid="review-score">{score}</div>
      <div data-testid="review-comment">{comment}</div>
      <div data-testid="review-date">{dateTime}</div>
      <div data-testid="review-user-name">{userName}</div>
      <div data-testid="review-user-img">{String(userImg)}</div>
      <div data-testid="review-img">{String(reviewImg)}</div>
      <div data-testid="review-gathering-name">{gatheringName}</div>
      <div data-testid="review-location">{location}</div>
    </div>
  ),
}));

// Chip mock
jest.mock('@/shared/ui/chip', () => ({
  Chip: ({ children, active, onClick, className }: ChipProps) => (
    <button
      data-testid="chip"
      data-active={active}
      onClick={
        onClick
          ? (e: React.MouseEvent<HTMLButtonElement>) => {
              if (onClick) onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
            }
          : undefined
      }
      className={className}
    >
      {children}
    </button>
  ),
}));

describe('ReviewsContent', () => {
  beforeEach(() => {
    // 기본 mock 설정
    mockUseTranslations.mockReturnValue((key: string) => {
      const translations: Record<string, string> = {
        'tabs.writableReviews': '작성 가능한 리뷰',
        'tabs.reviews': '나의 리뷰',
        'reviews.noWritableReviews': '작성 가능한 리뷰가 없습니다',
        'reviews.noWrittenReviews': '작성한 리뷰가 없습니다',
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

    // 기본 사용자 정보
    const mockUser = createMockUser();
    mockUseGetUser.mockReturnValue({
      data: mockUser,
      isLoading: false,
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('작성 가능한 리뷰 탭', () => {
    it('작성 가능한 리뷰가 있는 경우 모임 카드들을 렌더링한다', async () => {
      const mockGatherings = [
        createMockGathering({
          id: 1,
          name: '완료된 모임 1',
          isCompleted: true,
          isReviewed: false,
        }),
        createMockGathering({
          id: 2,
          name: '완료된 모임 2',
          isCompleted: true,
          isReviewed: false,
        }),
      ];

      mockUseGetGatheringsJoined.mockReturnValue({
        data: mockGatherings,
        isLoading: false,
        error: null,
      });
      mockUseGetReviews.mockReturnValue({
        data: { data: [] },
        isLoading: false,
        error: null,
      });

      render(
        <TestWrapper>
          <ReviewsContent />
        </TestWrapper>,
      );

      // 작성 가능한 리뷰 탭이 기본으로 선택되어 있는지 확인
      expect(screen.getByText('작성 가능한 리뷰')).toBeInTheDocument();

      // 모임 카드들이 렌더링되는지 확인
      await waitFor(() => {
        const gatheringCards = screen.getAllByTestId('gathering-card');
        expect(gatheringCards).toHaveLength(2);
      });

      // 첫 번째 모임 카드의 정보 확인
      const gatheringCards = screen.getAllByTestId('gathering-card');
      expect(gatheringCards[0]).toHaveTextContent('1');
      expect(gatheringCards[0]).toHaveTextContent('완료된 모임 1');
      expect(gatheringCards[0]).toHaveTextContent('completed');
      expect(gatheringCards[0]).toHaveTextContent('not-reviewed');
    });

    it('작성 가능한 리뷰가 없는 경우 빈 상태 메시지를 표시한다', async () => {
      mockUseGetGatheringsJoined.mockReturnValue({
        data: [],
        isLoading: false,
        error: null,
      });
      mockUseGetReviews.mockReturnValue({
        data: { data: [] },
        isLoading: false,
        error: null,
      });

      render(
        <TestWrapper>
          <ReviewsContent />
        </TestWrapper>,
      );

      // 빈 상태 메시지가 표시되는지 확인
      await waitFor(() => {
        expect(screen.getByText('작성 가능한 리뷰가 없습니다')).toBeInTheDocument();
      });

      // 모임 카드가 렌더링되지 않는지 확인
      expect(screen.queryByTestId('gathering-card')).not.toBeInTheDocument();
    });
  });

  describe('작성한 리뷰 탭', () => {
    it('작성한 리뷰 탭을 클릭하면 리뷰 목록을 표시한다', async () => {
      const mockGatherings = [
        createMockGathering({
          id: 1,
          name: '완료된 모임 1',
          isCompleted: true,
          isReviewed: false,
        }),
      ];

      const mockReviews = {
        data: [
          {
            id: 1,
            score: 5,
            comment: '정말 좋은 모임이었습니다!',
            createdAt: '2024-01-15T10:00:00Z',
            Gathering: {
              id: 1,
              name: '완료된 모임 1',
              location: 'SEOUL',
            },
            User: {
              id: 1,
              name: '테스트 사용자',
              image: 'https://example.com/user.jpg',
            },
          },
        ],
        totalItemCount: 1,
        currentPage: 1,
        totalPages: 1,
      };

      mockUseGetGatheringsJoined.mockReturnValue({
        data: mockGatherings,
        isLoading: false,
        error: null,
      });
      mockUseGetReviews.mockReturnValue({
        data: mockReviews,
        isLoading: false,
        error: null,
      });

      render(
        <TestWrapper>
          <ReviewsContent />
        </TestWrapper>,
      );

      // 작성한 리뷰 탭 클릭
      const writtenReviewsTab = screen.getByText('나의 리뷰');
      fireEvent.click(writtenReviewsTab);

      // 리뷰 카드가 렌더링되는지 확인
      await waitFor(() => {
        const reviewCards = screen.getAllByTestId('review-card');
        expect(reviewCards).toHaveLength(1);
      });

      // 리뷰 카드의 정보 확인
      const reviewCard = screen.getByTestId('review-card');
      expect(reviewCard).toHaveTextContent('5');
      expect(reviewCard).toHaveTextContent('정말 좋은 모임이었습니다!');
      expect(reviewCard).toHaveTextContent('테스트 사용자');
      expect(reviewCard).toHaveTextContent('완료된 모임 1');
      expect(reviewCard).toHaveTextContent('SEOUL');
    });

    it('작성한 리뷰가 없는 경우 빈 상태 메시지를 표시한다', async () => {
      mockUseGetGatheringsJoined.mockReturnValue({
        data: [],
        isLoading: false,
        error: null,
      });
      mockUseGetReviews.mockReturnValue({
        data: { data: [], totalItemCount: 0, currentPage: 1, totalPages: 1 },
        isLoading: false,
        error: null,
      });

      render(
        <TestWrapper>
          <ReviewsContent />
        </TestWrapper>,
      );

      // 작성한 리뷰 탭 클릭
      const writtenReviewsTab = screen.getByText('나의 리뷰');
      fireEvent.click(writtenReviewsTab);

      // 빈 상태 메시지가 표시되는지 확인
      await waitFor(() => {
        expect(screen.getByText('작성한 리뷰가 없습니다')).toBeInTheDocument();
      });

      // 리뷰 카드가 렌더링되지 않는지 확인
      expect(screen.queryByTestId('review-card')).not.toBeInTheDocument();
    });
  });

  describe('탭 전환이 올바르게 작동한다', () => {
    it('탭을 클릭하면 해당 탭의 내용이 표시된다', async () => {
      const mockGatherings = [
        createMockGathering({
          id: 1,
          name: '완료된 모임 1',
          isCompleted: true,
          isReviewed: false,
        }),
      ];

      const mockReviews = {
        data: [
          {
            id: 1,
            score: 5,
            comment: '정말 좋은 모임이었습니다!',
            createdAt: '2024-01-15T10:00:00Z',
            Gathering: {
              id: 1,
              name: '완료된 모임 1',
              location: 'SEOUL',
            },
            User: {
              id: 1,
              name: '테스트 사용자',
              image: 'https://example.com/user.jpg',
            },
          },
        ],
        totalItemCount: 1,
        currentPage: 1,
        totalPages: 1,
      };

      mockUseGetGatheringsJoined.mockReturnValue({
        data: mockGatherings,
        isLoading: false,
        error: null,
      });
      mockUseGetReviews.mockReturnValue({
        data: mockReviews,
        isLoading: false,
        error: null,
      });

      render(
        <TestWrapper>
          <ReviewsContent />
        </TestWrapper>,
      );

      // 초기에는 작성 가능한 리뷰 탭이 활성화되어 있음
      expect(screen.getByText('작성 가능한 리뷰')).toBeInTheDocument();
      expect(screen.getByTestId('gathering-card')).toBeInTheDocument();

      // 작성한 리뷰 탭 클릭
      const writtenReviewsTab = screen.getByText('나의 리뷰');
      fireEvent.click(writtenReviewsTab);

      // 작성한 리뷰 탭의 내용이 표시되는지 확인
      await waitFor(() => {
        expect(screen.getByTestId('review-card')).toBeInTheDocument();
      });

      // 작성 가능한 리뷰 탭 클릭
      const writableReviewsTab = screen.getByText('작성 가능한 리뷰');
      fireEvent.click(writableReviewsTab);

      // 작성 가능한 리뷰 탭의 내용이 표시되는지 확인
      await waitFor(() => {
        expect(screen.getByTestId('gathering-card')).toBeInTheDocument();
      });
    });
  });

  describe('사용자 정보가 없는 경우 적절히 처리한다', () => {
    it('사용자 정보 로드에 실패한 경우 적절히 처리한다', async () => {
      mockUseGetUser.mockReturnValue({
        data: null,
        isLoading: false,
        error: new Error('사용자 정보 로드 실패'),
      });
      mockUseGetGatheringsJoined.mockReturnValue({
        data: null,
        isLoading: false,
        error: null,
      });
      mockUseGetReviews.mockReturnValue({
        data: null,
        isLoading: false,
        error: null,
      });

      render(
        <TestWrapper>
          <ReviewsContent />
        </TestWrapper>,
      );

      // 에러 상태에서도 컴포넌트가 렌더링되는지 확인
      await waitFor(() => {
        expect(screen.getByText('작성 가능한 리뷰가 없습니다')).toBeInTheDocument();
      });
    });
  });

  describe('로딩 상태일 때 적절히 처리한다', () => {
    it('로딩 상태일 때 적절히 처리한다', () => {
      mockUseGetUser.mockReturnValue({
        data: null,
        isLoading: true,
        error: null,
      });
      mockUseGetGatheringsJoined.mockReturnValue({
        data: null,
        isLoading: true,
        error: null,
      });
      mockUseGetReviews.mockReturnValue({
        data: null,
        isLoading: true,
        error: null,
      });

      render(
        <TestWrapper>
          <ReviewsContent />
        </TestWrapper>,
      );

      // 로딩 상태에서도 컴포넌트가 렌더링되는지 확인
      expect(screen.getByText('작성 가능한 리뷰가 없습니다')).toBeInTheDocument();
    });
  });
});
