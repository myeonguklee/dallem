import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useRouter } from '@/i18n';
import { TestWrapper } from '@/shared/lib/test/testUtils';
import { fireEvent, render, screen } from '@testing-library/react';
import { MyPageTab } from './MyPageTab';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'pages.myPage.tabs.joinedGatherings': '나의 모임',
      'pages.myPage.tabs.reviews': '나의 리뷰',
      'pages.myPage.tabs.createdGatherings': '내가 만든 모임',
    };
    return translations[key] || key;
  },
  useLocale: jest.fn(() => 'ko'),
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/my-page/gatherings-joined'),
}));

// Mock i18n router
jest.mock('@/i18n', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

// Mock ROUTES
jest.mock('@/shared/config/routes', () => ({
  ROUTES: {
    MY_PAGE_TAB: (id: string) => `/my-page/${id}`,
  },
}));

// Mock Tab
jest.mock('@/shared/ui/tab', () => ({
  Tab: ({
    items,
    selectedId,
    onSelect,
    className,
  }: {
    items: { id: string; label: string }[];
    selectedId: string;
    onSelect: (id: string) => void;
    className?: string;
  }) => (
    <div
      data-testid="tab"
      data-selected={selectedId}
      className={className}
    >
      {items.map((item) => (
        <button
          key={item.id}
          data-testid={`tab-${item.id}`}
          onClick={() => onSelect(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  ),
}));

describe('MyPageTab', () => {
  const mockUsePathname = usePathname as unknown as jest.Mock;
  const mockUseLocale = useLocale as unknown as jest.Mock;
  const mockUseRouter = useRouter as unknown as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUsePathname.mockReturnValue('/my-page/gatherings-joined');
    mockUseLocale.mockReturnValue('ko');
    mockUseRouter.mockReturnValue({ push: jest.fn() });
  });

  it('현재 경로에 따라 올바른 탭이 선택되어야 한다', () => {
    render(
      <TestWrapper>
        <MyPageTab />
      </TestWrapper>,
    );

    expect(screen.getByTestId('tab')).toHaveAttribute('data-selected', 'gatherings-joined');
  });

  it('탭 선택 시 라우터로 이동해야 한다 (locale 포함)', () => {
    const mockPush = jest.fn();
    mockUseRouter.mockReturnValue({ push: mockPush });

    render(
      <TestWrapper>
        <MyPageTab />
      </TestWrapper>,
    );

    fireEvent.click(screen.getByTestId('tab-reviews'));

    expect(mockPush).toHaveBeenCalledWith('/my-page/reviews', { locale: 'ko' });
  });

  it('locale이 en이면 whitespace-nowrap 클래스가 적용되어야 한다', () => {
    mockUseLocale.mockReturnValue('en');

    render(
      <TestWrapper>
        <MyPageTab />
      </TestWrapper>,
    );

    expect(screen.getByTestId('tab')).toHaveClass('whitespace-nowrap');
  });

  it('경로가 \/my-page\/reviews 이면 reviews 탭이 선택되어야 한다', () => {
    mockUsePathname.mockReturnValue('/my-page/reviews');

    render(
      <TestWrapper>
        <MyPageTab />
      </TestWrapper>,
    );

    expect(screen.getByTestId('tab')).toHaveAttribute('data-selected', 'reviews');
  });

  it('경로가 \/my-page\/gatherings-created 이면 gatherings-created 탭이 선택되어야 한다', () => {
    mockUsePathname.mockReturnValue('/my-page/gatherings-created');

    render(
      <TestWrapper>
        <MyPageTab />
      </TestWrapper>,
    );

    expect(screen.getByTestId('tab')).toHaveAttribute('data-selected', 'gatherings-created');
  });

  it('알 수 없는 경로면 기본값인 gatherings-joined 탭이 선택되어야 한다', () => {
    mockUsePathname.mockReturnValue('/my-page/unknown');

    render(
      <TestWrapper>
        <MyPageTab />
      </TestWrapper>,
    );

    expect(screen.getByTestId('tab')).toHaveAttribute('data-selected', 'gatherings-joined');
  });
});
