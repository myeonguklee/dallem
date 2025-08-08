import { act, renderHook } from '@testing-library/react';
import * as favoritesStorage from './favoritesStorage';
import { useFavoritesAction } from './usefavorites';

jest.mock('./favoritesStorage'); // 모듈 전체를 모킹!

describe('useFavoritesAction 커스텀 훅', () => {
  const mockIsFavorite = favoritesStorage.isFavorite as jest.Mock;
  const mockToggleFavorite = favoritesStorage.toggleFavorite as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks(); // mock 초기화
  });

  it('초기 렌더링 시 isFavorite에 따라 isLiked가 설정된다', () => {
    mockIsFavorite.mockReturnValue(true);

    const { result } = renderHook(() => useFavoritesAction(1));
    expect(result.current.isLiked).toBe(true);
  });

  it('handleFavoritesStorage 실행 시 toggleFavorite 호출 및 isLiked 반전', () => {
    mockIsFavorite.mockReturnValue(false);

    const { result } = renderHook(() => useFavoritesAction(1));
    expect(result.current.isLiked).toBe(false);

    act(() => {
      result.current.handleFavoritesStorage();
    });

    expect(mockToggleFavorite).toHaveBeenCalledWith(1);
    expect(result.current.isLiked).toBe(true);
  });

  it('id가 undefined일 경우 아무 동작도 하지 않는다', () => {
    const { result } = renderHook(() => useFavoritesAction(undefined));

    act(() => {
      result.current.handleFavoritesStorage();
    });

    expect(mockToggleFavorite).not.toHaveBeenCalled();
    expect(result.current.isLiked).toBe(false);
  });
});
