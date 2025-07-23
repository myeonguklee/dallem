const FAVORITES_KEY = 'Like';

// 불러오기
export const getFavoriteList = (): number[] => {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('로컬 스토리지에서 찜 목록을 불러오는 데 실패했습니다:', error);
    return [];
  }
};

// 저장하기
export const saveFavoriteList = (gatheringId: number): void => {
  if (typeof window === 'undefined') return;
  try {
    const favorites = getFavoriteList();
    if (!favorites.includes(gatheringId)) {
      const updateFavorites = [...favorites, gatheringId];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updateFavorites));
    }
  } catch (error) {
    console.error('로컬 스토리지에 찜 목록을 저장하는 데 실패했습니다 : ', error);
  }
};

// 해제하기
export const removeFavoriteList = (gatheringId: number): void => {
  if (typeof window === 'undefined') return;
  try {
    const favorites = getFavoriteList();
    const updateFavorites = favorites.filter((id) => id !== gatheringId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updateFavorites));
  } catch (error) {
    console.error('로컬 스토리지에서 찜 목록을 불러오는 데 실패했습니다:', error);
  }
};

// 전체 삭제
export const clearFavoriteList = (): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(FAVORITES_KEY);
  } catch (error) {
    console.error('로컬 스토리지에서 찜 목록을 불러오는 데 실패했습니다:', error);
  }
};

// id 확인 유뮤
export const isFavorite = (gatheringId: number): boolean => {
  const favorites = getFavoriteList();
  return favorites.includes(gatheringId);
};

// 찜 토글 함수
export const toggleFavorite = (gatheringId: number): void => {
  if (typeof window === 'undefined') return;

  if (isFavorite(gatheringId)) {
    removeFavoriteList(gatheringId);
  } else {
    saveFavoriteList(gatheringId);
  }
};
