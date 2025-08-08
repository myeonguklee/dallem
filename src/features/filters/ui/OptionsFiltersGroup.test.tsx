import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OptionsFiltersGroup } from './OptionsFiltersGroup';

// router 테스트 mock 처리
const mockPush = jest.fn();
const mockPathName = jest.fn();
const mockUseSearchParams = jest.fn();

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
      'regions.all': '지역 전체',
      'regions.konkuk': '건대입구',
      'regions.euljiro': '을지로3가',
      'regions.sinrim': '신림',
      'regions.hongdae': '홍대입구',
      'sort.createdAt': '최신순',
      'sort.scoreTop': '리뷰 높은 순',
      'sort.deadline': '마감 임박',
      'sort.participants': '참여 인원 순',
      'sort.date': '모임 날짜 순',
    };
    return t[key] ?? key; // 못 찾으면 그냥 키 출력
  },
}));

// DateFilter는 테스트 대상이 아님으로 mock 처리
jest.mock('./DateFilter', () => ({
  DateFilter: () => <div data-testid="date-filter">Date Filter</div>,
}));

describe('OptionsFiltersGroup 테스트', () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockPathName.mockClear();
    mockUseSearchParams.mockReset();
  });

  const defaultProps = {
    sortValue: ['createdAt', 'score', 'participantCount'],
    defaultSort: 'createdAt',
  };

  describe('초기 렌더링 테스트', () => {
    it('URL 파라미터가 없을 때, 기본값으로 렌더링되어야 한다', () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams());

      render(<OptionsFiltersGroup {...defaultProps} />);

      const regionChip = screen.getByRole('button', { name: '지역 전체' });
      const sortButton = screen.getByRole('button', { name: '최신순' });

      expect(regionChip).toBeInTheDocument();
      expect(sortButton).toBeInTheDocument();
    });
    it('URL에 location과 sortBy 파라미터가 있을 때, 해당 값으로 렌더링되어야 한다', () => {
      mockUseSearchParams.mockReturnValue(new URLSearchParams('location=홍대입구&sortBy=score'));

      render(<OptionsFiltersGroup {...defaultProps} />);

      const regionChip = screen.getByRole('button', { name: '홍대입구' });
      const sortButton = screen.getByRole('button', { name: '리뷰 높은 순' });

      expect(regionChip).toBeInTheDocument();
      expect(regionChip).toHaveClass('bg-black');
      expect(sortButton).toBeInTheDocument();
    });
    it('props로 받은 sortValue에 따라 정렬 옵션이 필터링되어야 한다', async () => {
      const user = userEvent.setup();
      mockUseSearchParams.mockReturnValue(new URLSearchParams());

      render(
        <OptionsFiltersGroup
          sortValue={['score', 'registrationEnd', 'participantCount']}
          defaultSort="score"
        />,
      );

      const sortButton = screen.getByRole('button', { name: '리뷰 높은 순' });
      await user.click(sortButton);

      const sortScoreTopBtn = screen.getAllByRole('button', { name: '리뷰 높은 순' });

      expect(sortScoreTopBtn[1]).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '마감 임박' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '참여 인원 순' })).toBeInTheDocument();
    });
  });
  describe('지역 타입 테스트', () => {
    it('다른 지역("홍대입구")을 선택하면 선택지역으로 url이 변경되어야한다. ', async () => {
      const user = userEvent.setup();
      mockUseSearchParams.mockReturnValue(new URLSearchParams('?location=건대입구'));
      mockPathName.mockReturnValue('/reviews');

      render(<OptionsFiltersGroup {...defaultProps} />);
      const regionChip = screen.getByRole('button', { name: '건대입구' });
      await user.click(regionChip);

      const changeRegin = screen.getByRole('button', { name: '홍대입구' });
      await user.click(changeRegin);

      expect(mockPush).toHaveBeenCalledWith({
        pathname: mockPathName(),
        query: { location: '홍대입구' },
      });
    });
    it('전체보기를 선택하면, 선택되어있던 지역이 삭제되어야한다. ', async () => {
      const user = userEvent.setup();
      mockUseSearchParams.mockReturnValue(new URLSearchParams('?location=건대입구'));
      mockPathName.mockReturnValue('/reviews');
      render(<OptionsFiltersGroup {...defaultProps} />);
      const regionChip = screen.getByRole('button', { name: '건대입구' });
      await user.click(regionChip);

      const changeRegin = screen.getByRole('button', { name: '지역 전체' });
      await user.click(changeRegin);

      expect(mockPush).toHaveBeenCalledWith({
        pathname: mockPathName(),
        query: {},
      });
    });
  });
  describe('정렬 타입 테스트', () => {
    it('다른 정렬 기준("평점순")을 선택하면, sortBy 파라미터와 함께 router.push가 호출되어야 한다', async () => {
      const user = userEvent.setup();
      mockUseSearchParams.mockReturnValue(new URLSearchParams());
      mockPathName.mockReturnValue('/reviews');
      render(<OptionsFiltersGroup {...defaultProps} />);

      const sortButton = screen.getByRole('button', { name: '최신순' });
      await user.click(sortButton);

      const selectBtn = screen.getByRole('button', { name: '리뷰 높은 순' });
      await user.click(selectBtn);

      expect(mockPush).toHaveBeenCalledWith({
        pathname: mockPathName(),
        query: { sortBy: 'score' },
      });
    });
  });
});
