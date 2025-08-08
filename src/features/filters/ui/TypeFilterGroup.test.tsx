import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TypeFilterGroup } from './TypeFilterGroup';

// router 테스트 mock 처리
const mockPush = jest.fn();
const mockPathName = jest.fn();
const mockUseSearchParams = jest.fn();

// 가짜 url 환경 제공하기
// jest.mock는 최상단 으로 끌어올리는 호이스팅, 따라서 함수로 감싸, 런타임에 참조할 필요가 있음!
jest.mock('next/navigation', () => ({
  useSearchParams: () => mockUseSearchParams(),
}));
//
jest.mock('@/i18n', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => mockPathName(),
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const t: Record<string, string> = {
      'categories.dallaemfit': '달램핏',
      'categories.workation': '워케이션',
      'activities.all': '전체',
      'activities.officeStretching': '오피스 스트레칭',
      'activities.mindfulness': '마인드풀니스',
    };
    return t[key] ?? key; // 못 찾으면 그냥 키 출력
  },
}));

describe('TypeFilterGroup 테스트 ', () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockPathName.mockClear();
    mockUseSearchParams.mockReset();
  });

  it('type이 변경되면 offset 쿼리 파라미터는 제거된다', async () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams('type=DALLAEMFIT&offset=10'));
    mockPathName.mockReturnValue('/reviews');

    render(<TypeFilterGroup />);

    const workationTab = screen.getByRole('button', { name: '워케이션' });
    await userEvent.click(workationTab);

    expect(mockPush).toHaveBeenCalledWith({
      pathname: mockPathName(),
      query: expect.not.objectContaining({ offset: '10' }),
    });
  });

  describe('기본 렌더링 테스트', () => {
    it('type=DALLAEMFIT	일때 , 탭 두개, 칩 3개가 모두 보인다.  ', () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams('?type=DALLAEMFIT'));
      render(<TypeFilterGroup />);

      //탭 체크
      expect(screen.getByText('달램핏')).toBeInTheDocument();
      expect(screen.getByText('워케이션')).toBeInTheDocument();

      //칩 체크
      expect(screen.getByText('전체')).toBeInTheDocument();
      expect(screen.getByText('오피스 스트레칭')).toBeInTheDocument();
      expect(screen.getByText('마인드풀니스')).toBeInTheDocument();
    });
    it('type=WORKATION으로 일때, 탭 두개, 칩 전체만 보인다. ', () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams('?type=WORKATION'));
      render(<TypeFilterGroup />);

      //탭 체크
      expect(screen.getByText('달램핏')).toBeInTheDocument();
      expect(screen.getByText('워케이션')).toBeInTheDocument();

      //칩 체크
      expect(screen.getByText('전체')).toBeInTheDocument();
      expect(screen.queryByText('오피스 스트레칭')).not.toBeInTheDocument();
      expect(screen.queryByText('마인드풀니스')).not.toBeInTheDocument();
    });
  });
  describe('탭 클릭 테스트', () => {
    it('달램핏 탭 클릭 시, ?type=DALLAEMFIT 경로로 이동한다', async () => {
      const user = userEvent.setup();
      mockUseSearchParams.mockReturnValue(new URLSearchParams('?type=WORKATION'));
      mockPathName.mockReturnValue('/reviews');

      render(<TypeFilterGroup />);

      //  달림핏 클릭
      const DallemfitTab = screen.getByText('달램핏');
      await user.click(DallemfitTab);

      expect(mockPush).toHaveBeenCalledWith({
        pathname: mockPathName(),
        query: { type: 'DALLAEMFIT' },
      });

      //
    });
    it('워케이션 탭 클릭 시, ?type=WORKATION 경로로 이동한다', async () => {
      const user = userEvent.setup();
      mockUseSearchParams.mockReturnValue(new URLSearchParams('?type=DALLAEMFIT'));
      mockPathName.mockReturnValue('/gathering');

      render(<TypeFilterGroup />);

      //워케이션 클릭
      const warkationTab = screen.getByText('워케이션');
      await user.click(warkationTab);

      expect(mockPush).toHaveBeenCalledWith({
        pathname: mockPathName(),
        query: { type: 'WORKATION' },
      });
    });
    it('선택된 탭에만 활성화 색상 클래스가 적용된다', () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams('?type=DALLAEMFIT'));
      mockPathName.mockReturnValue('/reviews');

      render(<TypeFilterGroup />);

      const dallaemfitTab = screen.getByText('달램핏').closest('button');
      const workationTab = screen.getByText('워케이션').closest('button');

      expect(dallaemfitTab).toHaveClass('text-[var(--color-font-base)]');
      expect(workationTab).toHaveClass('text-gray-500');
    });
  });
  describe('칩 클릭 테스트 ', () => {
    it('오피스 칩 클릭 테스트 ', async () => {
      const user = userEvent.setup();
      mockUseSearchParams.mockReturnValue(new URLSearchParams('?type=DALLAEMFIT'));
      mockPathName.mockReturnValue('/gathering');

      render(<TypeFilterGroup />);

      const officeChip = screen.getByText('오피스 스트레칭');
      await user.click(officeChip);

      expect(mockPush).toHaveBeenCalledWith({
        pathname: mockPathName(),
        query: { type: 'OFFICE_STRETCHING' },
      });
    });

    it('마인드폴니스 칩 테스트', async () => {
      const user = userEvent.setup();
      mockUseSearchParams.mockReturnValue(new URLSearchParams('?type=DALLAEMFIT'));
      mockPathName.mockReturnValue('/reviews');

      render(<TypeFilterGroup />);

      const mindChip = screen.getByText('마인드풀니스');
      await user.click(mindChip);

      expect(mockPush).toHaveBeenCalledWith({
        pathname: mockPathName(),
        query: { type: 'MINDFULNESS' },
      });
    });
    it('칩 활성화 테스트', () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams('?type=MINDFULNESS'));
      mockPathName.mockReturnValue('/reviews');

      render(<TypeFilterGroup />);

      const allChip = screen.getByText('전체');
      const officeChip = screen.getByText('오피스 스트레칭');
      const mindChip = screen.getByText('마인드풀니스');

      expect(allChip).toHaveClass('bg-gray-200 ');
      expect(officeChip).toHaveClass('bg-gray-200 ');
      expect(mindChip).toHaveClass('bg-gray-900 ');
    });

    it('type이 없을 때 기본값 DALLAEMFIT이 적용되어 달램핏 탭과 칩이 활성화된다', () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams());

      render(<TypeFilterGroup />);

      const dallaemfitTab = screen.getByText('달램핏').closest('button');
      const allChip = screen.getByText('전체');

      expect(dallaemfitTab).toHaveClass('text-[var(--color-font-base)]'); // 활성 탭
      expect(allChip).toHaveClass('bg-gray-900'); // 활성 칩
    });
  });
});
