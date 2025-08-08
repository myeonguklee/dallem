import { clearFavoriteList, getFavoriteList, isFavorite, toggleFavorite } from './favoritesStorage';

describe('로컬스토리지 찜 기능', () => {
  const FAVORITES_KEY = 'Like';

  const mockSetItem = jest.spyOn(Storage.prototype, 'setItem');
  const mockGetItem = jest.spyOn(Storage.prototype, 'getItem');
  const mockRemoveItem = jest.spyOn(Storage.prototype, 'removeItem');

  beforeEach(() => {
    localStorage.clear();
    mockSetItem.mockReset();
    mockGetItem.mockReset();
    mockRemoveItem.mockReset();
  });

  it('getFavoriteList: 저장된 값이 없으면 빈 배열을 반환한다', () => {
    mockGetItem.mockReturnValueOnce(null);
    const result = getFavoriteList();
    expect(result).toEqual([]);
  });

  it('toggleFavorite: 찜이 추가되면 저장된다', () => {
    mockGetItem.mockReturnValueOnce(JSON.stringify([]));
    toggleFavorite(1);
    expect(mockSetItem).toHaveBeenCalledWith(FAVORITES_KEY, JSON.stringify([1]));
  });

  it('toggleFavorite: 이미 찜된 항목이면 해제된다', () => {
    mockGetItem.mockReturnValueOnce(JSON.stringify([1]));
    toggleFavorite(1);
    expect(mockSetItem).toHaveBeenCalledWith(FAVORITES_KEY, JSON.stringify([]));
  });

  it('isFavorite: 찜된 항목이면 true 반환', () => {
    mockGetItem.mockReturnValueOnce(JSON.stringify([1, 2]));
    expect(isFavorite(2)).toBe(true);
  });

  it('isFavorite: 찜되지 않은 항목이면 false 반환', () => {
    mockGetItem.mockReturnValueOnce(JSON.stringify([3, 4]));
    expect(isFavorite(1)).toBe(false);
  });

  it('clearFavoriteList: removeItem이 호출된다', () => {
    clearFavoriteList();
    expect(mockRemoveItem).toHaveBeenCalledWith(FAVORITES_KEY);
  });
});
