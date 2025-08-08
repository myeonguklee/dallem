import { TestWrapper } from '@/shared/lib/test/testUtils';
import { fireEvent, render, screen } from '@testing-library/react';
import { GatheringLikeButton } from './GatheringLikeButton';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'ui.likeButton.like': '좋아요',
      'ui.likeButton.unlike': '좋아요 취소',
    };
    return translations[key] || key;
  },
}));

// Mock useFavoritesAction
jest.mock('@/features/favorites/model/usefavorites', () => ({
  useFavoritesAction: jest.fn(),
}));

// Mock icons
jest.mock('@/shared/ui/icon', () => ({
  LikeIcon: (
    props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  ) => (
    <div
      data-testid="like-icon"
      {...props}
    />
  ),
  UnlikeIcon: (
    props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  ) => (
    <div
      data-testid="unlike-icon"
      {...props}
    />
  ),
}));

describe('GatheringLikeButton', () => {
  const mockUseFavoritesAction = jest.requireMock(
    '@/features/favorites/model/usefavorites',
  ).useFavoritesAction;
  const mockOnToggle = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('좋아요가 되어있지 않을 때 UnlikeIcon이 표시되어야 한다', () => {
    mockUseFavoritesAction.mockReturnValue({
      isLiked: false,
      handleFavoritesStorage: jest.fn(),
    });

    render(
      <TestWrapper>
        <GatheringLikeButton gatheringId={1} />
      </TestWrapper>,
    );

    expect(screen.getByTestId('unlike-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('like-icon')).not.toBeInTheDocument();
  });

  it('좋아요가 되어있을 때 LikeIcon이 표시되어야 한다', () => {
    mockUseFavoritesAction.mockReturnValue({
      isLiked: true,
      handleFavoritesStorage: jest.fn(),
    });

    render(
      <TestWrapper>
        <GatheringLikeButton gatheringId={1} />
      </TestWrapper>,
    );

    expect(screen.getByTestId('like-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('unlike-icon')).not.toBeInTheDocument();
  });

  it('버튼을 클릭하면 handleFavoritesStorage가 호출되어야 한다', () => {
    const mockHandleFavoritesStorage = jest.fn();
    mockUseFavoritesAction.mockReturnValue({
      isLiked: false,
      handleFavoritesStorage: mockHandleFavoritesStorage,
    });

    render(
      <TestWrapper>
        <GatheringLikeButton gatheringId={1} />
      </TestWrapper>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockHandleFavoritesStorage).toHaveBeenCalledTimes(1);
  });

  it('onToggle prop이 전달되었을 때 버튼 클릭 시 onToggle도 호출되어야 한다', () => {
    const mockHandleFavoritesStorage = jest.fn();
    mockUseFavoritesAction.mockReturnValue({
      isLiked: false,
      handleFavoritesStorage: mockHandleFavoritesStorage,
    });

    render(
      <TestWrapper>
        <GatheringLikeButton
          gatheringId={1}
          onToggle={mockOnToggle}
        />
      </TestWrapper>,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockHandleFavoritesStorage).toHaveBeenCalledTimes(1);
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });

  it('좋아요 상태에 따라 올바른 aria-label이 설정되어야 한다', () => {
    mockUseFavoritesAction.mockReturnValue({
      isLiked: false,
      handleFavoritesStorage: jest.fn(),
    });

    render(
      <TestWrapper>
        <GatheringLikeButton gatheringId={1} />
      </TestWrapper>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'like');
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  it('좋아요가 되어있을 때 올바른 aria-label이 설정되어야 한다', () => {
    mockUseFavoritesAction.mockReturnValue({
      isLiked: true,
      handleFavoritesStorage: jest.fn(),
    });

    render(
      <TestWrapper>
        <GatheringLikeButton gatheringId={1} />
      </TestWrapper>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'unlike');
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  it('버튼에 올바른 CSS 클래스가 적용되어야 한다', () => {
    mockUseFavoritesAction.mockReturnValue({
      isLiked: false,
      handleFavoritesStorage: jest.fn(),
    });

    render(
      <TestWrapper>
        <GatheringLikeButton gatheringId={1} />
      </TestWrapper>,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('cursor-pointer');
  });

  it('아이콘에 올바른 props가 전달되어야 한다', () => {
    mockUseFavoritesAction.mockReturnValue({
      isLiked: false,
      handleFavoritesStorage: jest.fn(),
    });

    render(
      <TestWrapper>
        <GatheringLikeButton gatheringId={1} />
      </TestWrapper>,
    );

    const icon = screen.getByTestId('unlike-icon');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(icon).toHaveAttribute('role', 'img');
  });
});
