import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DateFilter } from './DateFilter';

// -------------------- Router & SearchParams Mocks --------------------
const mockPush = jest.fn();
const mockPathName = jest.fn();
const mockUseSearchParams = jest.fn();

// next/navigation: useSearchParams만 사용
jest.mock('next/navigation', () => ({
  useSearchParams: () => mockUseSearchParams(),
}));

// 커스텀 라우터 훅
jest.mock('@/i18n', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => mockPathName(),
}));

// -------------------- UI / Intl Mocks --------------------
// Calendar: 간단 mock (날짜 픽 버튼 + footer 렌더)
jest.mock('@/shared/ui/calendar/Calendar', () => ({
  Calendar: ({
    onChange,
    footer,
    className,
  }: {
    onChange?: (d?: Date) => void;
    footer?: React.ReactNode;
    className?: string;
  }) => (
    <div
      data-testid="calendar"
      className={className}
    >
      <button onClick={() => onChange?.(new Date(2025, 7, 10))}>pick-2025-08-10</button>
      {footer}
    </div>
  ),
}));

// Button: 네이티브 버튼으로 대체
jest.mock('@/shared/ui/button', () => ({
  Button: (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => <button {...props} />,
}));

// variants: className passthrough
jest.mock('@/shared/ui/filter/variants', () => ({
  filterButtonVariants: ({ className }: { className?: string }) => className ?? '',
}));

// icons: 단순 스팬
jest.mock('@/shared/ui/icon', () => ({
  ArrowDownIcon: () => <span>arrow-down</span>,
  ArrowUpIcon: () => <span>arrow-up</span>,
  WhiteArrowDownIcon: () => <span>white-arrow</span>,
}));

// next-intl: t는 default 우선 반환, locale은 ko-KR
jest.mock('next-intl', () => ({
  useTranslations: () => (_: string, opts?: { default?: string }) => opts?.default ?? '',
  useLocale: () => 'ko-KR',
}));

// -------------------- Helpers --------------------
const setSearchParams = (obj: Record<string, string | undefined>) => {
  const sp = new URLSearchParams();
  Object.entries(obj).forEach(([k, v]) => {
    if (v !== undefined) sp.set(k, v);
  });
  mockUseSearchParams.mockReturnValue(sp);
};

const setPath = (path: string) => {
  mockPathName.mockReturnValue(path);
};

const openCalendar = async () => {
  const btn = screen.getByRole('button', { name: /전체 날짜|2025|date\.all/i });
  await userEvent.click(btn);
};

// -------------------- Tests --------------------
describe('<DateFilter />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setSearchParams({}); // 기본: date 없음
    setPath('/gathering'); // 기본 경로
  });

  it('초기: date 파라미터가 없으면 "전체 날짜"가 보인다', () => {
    render(<DateFilter />);
    expect(screen.getByRole('button', { name: /전체 날짜/ })).toBeInTheDocument();
  });

  it('초기: date 파라미터가 있으면 해당 날짜(로케일 형식)로 표시된다', () => {
    setSearchParams({ date: '2025-08-09' });
    render(<DateFilter />);
    // ko-KR 포맷(환경마다 공백/마침표 차이 있을 수 있어 느슨한 정규식)
    expect(screen.getByRole('button', { name: /2025.*08.*09/ })).toBeInTheDocument();
  });

  it('버튼 클릭 시 캘린더 팝업이 열린다', async () => {
    render(<DateFilter />);
    expect(screen.queryByTestId('calendar')).not.toBeInTheDocument();

    await openCalendar();
    expect(screen.getByTestId('calendar')).toBeInTheDocument();
  });

  it('캘린더 외부 클릭 시 팝업이 닫힌다', async () => {
    render(<DateFilter />);
    await openCalendar();
    expect(screen.getByTestId('calendar')).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByTestId('calendar')).not.toBeInTheDocument();
  });

  it('날짜 선택 후 "적용"하면 YYYY-MM-DD로 query 설정되어 push된다', async () => {
    render(<DateFilter />);
    await openCalendar();

    await userEvent.click(screen.getByRole('button', { name: 'pick-2025-08-10' }));
    await userEvent.click(screen.getByRole('button', { name: '적용' }));

    expect(mockPush).toHaveBeenCalledTimes(1);
    const arg = mockPush.mock.calls[0][0];

    expect(arg.pathname).toBe('/gathering');
    expect(arg.query.date).toBe('2025-08-10');
  });

  it('초기화 클릭 시 date 파라미터 제거, 다른 쿼리는 유지된 상태로 push된다', async () => {
    setSearchParams({ date: '2025-08-01', foo: 'bar' });
    render(<DateFilter />);
    await openCalendar();

    await userEvent.click(screen.getByRole('button', { name: '초기화' }));

    expect(mockPush).toHaveBeenCalledTimes(1);
    const arg = mockPush.mock.calls[0][0];

    expect(arg.pathname).toBe('/gathering');
    expect(arg.query.date).toBeUndefined();
    expect(arg.query.foo).toBe('bar');
  });

  it('이미 선택된 날짜가 있을 때 팝업 열고 바로 "적용"해도 동일 날짜로 push된다( tempDate 시드 확인 )', async () => {
    setSearchParams({ date: '2025-08-01' });
    render(<DateFilter />);
    await openCalendar();

    // 날짜 재선택 없이 적용
    await userEvent.click(screen.getByRole('button', { name: '적용' }));

    expect(mockPush).toHaveBeenCalledTimes(1);
    const arg = mockPush.mock.calls[0][0];

    expect(arg.query.date).toBe('2025-08-01');
  });

  it('적용/초기화 후 팝업은 닫힌다', async () => {
    render(<DateFilter />);
    await openCalendar();

    // 적용 후 닫힘
    await userEvent.click(screen.getByRole('button', { name: 'pick-2025-08-10' }));
    await userEvent.click(screen.getByRole('button', { name: '적용' }));
    expect(screen.queryByTestId('calendar')).not.toBeInTheDocument();

    // 다시 열고 초기화 후 닫힘
    await openCalendar();
    await userEvent.click(screen.getByRole('button', { name: '초기화' }));
    expect(screen.queryByTestId('calendar')).not.toBeInTheDocument();
  });
});
