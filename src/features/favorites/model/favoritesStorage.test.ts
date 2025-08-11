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

  it('getFavoriteList: JSON 파싱 실패 시 콘솔 에러 출력 후 빈 배열 반환', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockGetItem.mockReturnValueOnce('🙃 not-json 🙃'); // JSON.parse 에러 유도

    const result = getFavoriteList();

    expect(errorSpy).toHaveBeenCalledWith(
      '로컬 스토리지에서 찜 목록을 불러오는 데 실패했습니다:',
      expect.any(SyntaxError),
    );
    expect(result).toEqual([]);
    errorSpy.mockRestore();
  });

  it('toggleFavorite: setItem 예외 발생 시 콘솔 에러 출력', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    // 현재 목록은 빈 배열이라고 가정
    mockGetItem.mockReturnValueOnce(JSON.stringify([]));
    mockSetItem.mockImplementationOnce(() => {
      throw new Error('QuotaExceededError');
    });

    // 예외는 내부에서 잡히므로 호출 자체는 던지지 않음
    toggleFavorite(1);

    expect(errorSpy).toHaveBeenCalledWith(
      '로컬 스토리지에 찜 목록을 저장하는 데 실패했습니다:',
      expect.any(Error),
    );
    errorSpy.mockRestore();
  });

  it('clearFavoriteList: removeItem 예외 발생 시 콘솔 에러 출력', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockRemoveItem.mockImplementationOnce(() => {
      throw new Error('PermissionDenied');
    });

    clearFavoriteList();

    expect(errorSpy).toHaveBeenCalledWith(
      '로컬 스토리지에서 찜 목록을 삭제하는 데 실패했습니다:',
      expect.any(Error),
    );
    errorSpy.mockRestore();
  });

  it('getFavoriteList: window가 없는 환경에서는 빈 배열을 반환한다', () => {
    const originalWindow = global.window;
    try {
      // window를 undefined로 설정 (SSR 시뮬레이션)
      // @ts-expect-error 테스트를 위해 window를 제거
      delete global.window;

      const result = getFavoriteList();
      expect(result).toEqual([]);
    } finally {
      // 원래 상태로 복원
      global.window = originalWindow;
    }
  });
});
