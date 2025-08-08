import { getGatherings } from '@/entities/gathering/api';
import { parseGatheringFiltersFromSearchParams } from '@/entities/gathering/model/filters';
import { fetchFavoritesData } from './favorite';

// ✅ 의존성 모듈 mock
jest.mock('@/entities/gathering/api', () => ({
  getGatherings: jest.fn(),
}));

jest.mock('@/entities/gathering/model/filters', () => ({
  parseGatheringFiltersFromSearchParams: jest.fn((params) => params), // 통과 mock
}));

const mockGetGatherings = getGatherings as jest.Mock;
const mockParseFilters = parseGatheringFiltersFromSearchParams as jest.Mock;

describe('fetchFavoritesData - 로컬 ID 배열 → 쉼표 문자열 → Gathering 배열', () => {
  const baseParams = {
    ids: [10, 20, 30],
    type: 'MEET',
    pageParam: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('ids가 빈 배열이면 API 호출 없이 빈 결과를 반환한다', async () => {
    const result = await fetchFavoritesData({ ids: [], type: 'MEET', pageParam: 0 });

    expect(result).toEqual({ items: [], nextOffset: undefined });
    expect(mockGetGatherings).not.toHaveBeenCalled();
  });

  it('ids 배열은 쉼표 문자열로 변환되어 필터에 전달된다', async () => {
    await fetchFavoritesData(baseParams);

    expect(mockParseFilters).toHaveBeenCalledWith({
      id: '10,20,30',
      type: 'MEET',
    });
  });

  it('가공된 필터는 limit/offset과 함께 getGatherings로 전달된다', async () => {
    mockGetGatherings.mockResolvedValueOnce([{ id: 1 }]);

    await fetchFavoritesData(baseParams);

    expect(mockGetGatherings).toHaveBeenCalledWith({
      id: '10,20,30',
      type: 'MEET',
      limit: 10,
      offset: 0,
    });
  });

  it('응답이 LIMIT(10개)이면 nextOffset을 반환한다', async () => {
    const mockData = Array.from({ length: 10 }, (_, i) => ({ id: i + 1 }));
    mockGetGatherings.mockResolvedValueOnce(mockData);

    const result = await fetchFavoritesData(baseParams);

    expect(result.items).toEqual(mockData);
    expect(result.nextOffset).toBe(10);
  });

  it('응답이 LIMIT보다 적으면 nextOffset은 undefined이다', async () => {
    const mockData = [{ id: 1 }, { id: 2 }];
    mockGetGatherings.mockResolvedValueOnce(mockData);

    const result = await fetchFavoritesData(baseParams);

    expect(result.items).toEqual(mockData);
    expect(result.nextOffset).toBeUndefined();
  });

  it('API 호출 실패 시 콘솔 출력 + 빈 배열 반환', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockGetGatherings.mockRejectedValueOnce(new Error('에러'));

    const result = await fetchFavoritesData(baseParams);

    expect(consoleSpy).toHaveBeenCalled();
    expect(result).toEqual({ items: [], nextOffset: undefined });

    consoleSpy.mockRestore();
  });
});
