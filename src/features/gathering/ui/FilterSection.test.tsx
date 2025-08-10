import type { ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n';
import { TestWrapper } from '@/shared/lib/test/testUtils';
import { fireEvent, render, screen } from '@testing-library/react';
import { FilterSection } from './FilterSection';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'filters.categories.dallaemfit': '달램핏',
      'filters.categories.workation': '워케이션',
      'filters.activities.all': '전체',
      'filters.activities.officeStretching': '오피스 스트레칭',
      'filters.activities.mindfulness': '마인드풀니스',
      'filters.regions.all': '전체보기',
      'filters.regions.konkuk': '건대입구',
      'filters.regions.euljiro': '을지로3가',
      'filters.regions.sinrim': '신림',
      'filters.regions.hongdae': '홍대입구',
      'filters.sort.deadline': '마감순',
      'filters.sort.participants': '참가자순',
      'filters.sort.date': '날짜순',
    };
    return translations[key] || key;
  },
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

// Mock i18n router
jest.mock('@/i18n', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

// Mock DateFilter
jest.mock('@/features/filters/ui/DateFilter', () => ({
  DateFilter: () => <div data-testid="date-filter">날짜 필터</div>,
}));

// Mock UI components
jest.mock('@/shared/ui/chip', () => ({
  Chip: ({
    children,
    active,
    onClick,
    className,
  }: {
    children: ReactNode;
    active?: boolean;
    onClick?: () => void;
    className?: string;
  }) => (
    <button
      data-testid="chip"
      data-active={active}
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  ),
}));

type Option = { label: string; value: string };

jest.mock('@/shared/ui/filter', () => ({
  Filter: ({
    options,
    selected,
    onChange,
  }: {
    options: Option[];
    selected: string;
    onChange: (value: string) => void;
  }) => (
    <select
      data-testid="filter-select"
      value={selected}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option: Option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  ),
}));

jest.mock('@/shared/ui/icon', () => ({
  DalaemfitIcon: () => <div data-testid="dalaemfit-icon">달램핏 아이콘</div>,
  WorkationIcon: () => <div data-testid="workation-icon">워케이션 아이콘</div>,
}));

jest.mock('@/shared/ui/sort', () => ({
  Sort: ({
    options,
    selected,
    onChange,
  }: {
    options: Option[];
    selected: string;
    onChange: (value: string) => void;
  }) => (
    <select
      data-testid="sort-select"
      value={selected}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option: Option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  ),
}));

type TabItem = { id: string; label: ReactNode; icon?: ReactNode };

jest.mock('@/shared/ui/tab', () => ({
  Tab: ({
    items,
    selectedId,
    onSelect,
    className,
  }: {
    items: TabItem[];
    selectedId: string;
    onSelect: (id: string) => void;
    className?: string;
  }) => (
    <div
      data-testid="tab-container"
      className={className}
    >
      {items.map((item: TabItem) => (
        <button
          key={item.id}
          data-testid={`tab-${item.id}`}
          data-selected={selectedId === item.id}
          onClick={() => onSelect(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  ),
}));

// Mock next/dynamic
jest.mock('next/dynamic', () => {
  return jest.fn((importFunc) => {
    // 테스트에서 사용하는 컴포넌트들을 직접 반환
    if (importFunc.toString().includes('DateFilter')) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { DateFilter } = require('@/features/filters/ui/DateFilter');
      return DateFilter;
    }
    // 기본적으로는 빈 div 반환
    return function DynamicPlaceholder() {
      return <div data-testid="dynamic-placeholder" />;
    };
  });
});

describe('FilterSection', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as unknown as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it('기본 필터 상태로 올바르게 렌더링되어야 한다', () => {
    (useSearchParams as unknown as jest.Mock).mockReturnValue({
      get: (key: string) => {
        const params: Record<string, string> = {
          type: 'DALLAEMFIT',
          location: '전체보기',
          sortBy: 'registrationEnd',
        };
        return params[key] || null;
      },
    });

    render(
      <TestWrapper>
        <FilterSection />
      </TestWrapper>,
    );

    expect(screen.getByTestId('tab-container')).toBeInTheDocument();
    expect(screen.getByTestId('date-filter')).toBeInTheDocument();
    expect(screen.getByTestId('filter-select')).toBeInTheDocument();
    expect(screen.getByTestId('sort-select')).toBeInTheDocument();
  });

  it('달램핏 카테고리일 때 활동 칩이 표시되어야 한다', () => {
    (useSearchParams as unknown as jest.Mock).mockReturnValue({
      get: (key: string) => {
        const params: Record<string, string> = {
          type: 'DALLAEMFIT',
          location: '전체보기',
          sortBy: 'registrationEnd',
        };
        return params[key] || null;
      },
    });

    render(
      <TestWrapper>
        <FilterSection />
      </TestWrapper>,
    );

    const chips = screen.getAllByTestId('chip');
    expect(chips.length).toBeGreaterThan(0);
  });

  it('워케이션 카테고리일 때 워케이션 활동 칩이 표시되어야 한다', () => {
    (useSearchParams as unknown as jest.Mock).mockReturnValue({
      get: (key: string) => {
        const params: Record<string, string> = {
          type: 'WORKATION',
          location: '전체보기',
          sortBy: 'registrationEnd',
        };
        return params[key] || null;
      },
    });

    render(
      <TestWrapper>
        <FilterSection />
      </TestWrapper>,
    );

    const chips = screen.getAllByTestId('chip');
    expect(chips.length).toBeGreaterThan(0);
  });

  it('카테고리 탭을 클릭하면 라우터가 호출되어야 한다', () => {
    (useSearchParams as unknown as jest.Mock).mockReturnValue({
      get: (key: string) => {
        const params: Record<string, string> = {
          type: 'DALLAEMFIT',
          location: '전체보기',
          sortBy: 'registrationEnd',
        };
        return params[key] || null;
      },
    });

    render(
      <TestWrapper>
        <FilterSection />
      </TestWrapper>,
    );

    const workationTab = screen.getByTestId('tab-WORKATION');
    fireEvent.click(workationTab);

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/gathering',
      query: expect.objectContaining({
        type: 'WORKATION',
      }),
    });
  });

  it('활동 칩을 클릭하면 필터가 업데이트되어야 한다', () => {
    (useSearchParams as unknown as jest.Mock).mockReturnValue({
      get: (key: string) => {
        const params: Record<string, string> = {
          type: 'DALLAEMFIT',
          location: '전체보기',
          sortBy: 'registrationEnd',
        };
        return params[key] || null;
      },
    });

    render(
      <TestWrapper>
        <FilterSection />
      </TestWrapper>,
    );

    const chips = screen.getAllByTestId('chip');
    const firstChip = chips[0];
    fireEvent.click(firstChip);

    expect(mockPush).toHaveBeenCalled();
  });

  it('지역 필터를 변경하면 라우터가 호출되어야 한다', () => {
    (useSearchParams as unknown as jest.Mock).mockReturnValue({
      get: (key: string) => {
        const params: Record<string, string> = {
          type: 'DALLAEMFIT',
          location: '전체보기',
          sortBy: 'registrationEnd',
        };
        return params[key] || null;
      },
    });

    render(
      <TestWrapper>
        <FilterSection />
      </TestWrapper>,
    );

    const filterSelect = screen.getByTestId('filter-select');
    fireEvent.change(filterSelect, { target: { value: '건대입구' } });

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/gathering',
      query: expect.objectContaining({
        location: '건대입구',
      }),
    });
  });

  it('정렬 옵션을 변경하면 라우터가 호출되어야 한다', () => {
    (useSearchParams as unknown as jest.Mock).mockReturnValue({
      get: (key: string) => {
        const params: Record<string, string> = {
          type: 'DALLAEMFIT',
          location: '전체보기',
          sortBy: 'registrationEnd',
        };
        return params[key] || null;
      },
    });

    render(
      <TestWrapper>
        <FilterSection />
      </TestWrapper>,
    );

    const sortSelect = screen.getByTestId('sort-select');
    fireEvent.change(sortSelect, { target: { value: 'dateTime' } });

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/gathering',
      query: expect.objectContaining({
        sortBy: 'dateTime',
      }),
    });
  });

  it('지역을 전체보기로 변경하면 location 파라미터가 제거되어야 한다', () => {
    (useSearchParams as unknown as jest.Mock).mockReturnValue({
      get: (key: string) => {
        const params: Record<string, string> = {
          type: 'DALLAEMFIT',
          location: '건대입구',
          sortBy: 'registrationEnd',
        };
        return params[key] || null;
      },
    });

    render(
      <TestWrapper>
        <FilterSection />
      </TestWrapper>,
    );

    const filterSelect = screen.getByTestId('filter-select');
    fireEvent.change(filterSelect, { target: { value: '전체보기' } });

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/gathering',
      query: expect.not.objectContaining({
        location: '전체보기',
      }),
    });
  });

  it('카테고리 변경 시 활동 필터가 리셋되어야 한다', () => {
    (useSearchParams as unknown as jest.Mock).mockReturnValue({
      get: (key: string) => {
        const params: Record<string, string> = {
          type: 'OFFICE_STRETCHING',
          location: '전체보기',
          sortBy: 'registrationEnd',
        };
        return params[key] || null;
      },
    });

    render(
      <TestWrapper>
        <FilterSection />
      </TestWrapper>,
    );

    const workationTab = screen.getByTestId('tab-WORKATION');
    fireEvent.click(workationTab);

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/gathering',
      query: expect.objectContaining({
        type: 'WORKATION',
      }),
    });
  });

  it('올바른 CSS 클래스가 적용되어야 한다', () => {
    (useSearchParams as unknown as jest.Mock).mockReturnValue({
      get: (key: string) => {
        const params: Record<string, string> = {
          type: 'DALLAEMFIT',
          location: '전체보기',
          sortBy: 'registrationEnd',
        };
        return params[key] || null;
      },
    });

    render(
      <TestWrapper>
        <FilterSection />
      </TestWrapper>,
    );

    const tabContainer = screen.getByTestId('tab-container');
    expect(tabContainer).toHaveClass('gap-4');
  });
});
