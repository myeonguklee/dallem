const FAVORITES_KEY = 'Like';

// 불러오기
export const getFavoriteList = (): number[] => {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? (JSON.parse(data) as number[]) : [];
  } catch (error) {
    console.error('로컬 스토리지에서 찜 목록을 불러오는 데 실패했습니다:', error);
    return [];
  }
};

// 찜 토글 함수 (저장과 해제를 하나로 합친 헬퍼 함수)
export const toggleFavorite = (gatheringId: number): void => {
  if (typeof window === 'undefined') return;

  const favorites = getFavoriteList();
  let updatedFavorites: number[];

  if (favorites.includes(gatheringId)) {
    // 이미 찜한 경우 -> 해제
    updatedFavorites = favorites.filter((id) => id !== gatheringId);
  } else {
    // 찜하지 않은 경우 -> 추가
    updatedFavorites = [...favorites, gatheringId];
  }

  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error('로컬 스토리지에 찜 목록을 저장하는 데 실패했습니다:', error);
  }
};

// id 확인 유무
export const isFavorite = (gatheringId: number): boolean => {
  const favorites = getFavoriteList();
  return favorites.includes(gatheringId);
};

// (옵션) 전체 삭제 함수도 필요하다면 남겨둡니다.
export const clearFavoriteList = (): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(FAVORITES_KEY);
  } catch (error) {
    console.error('로컬 스토리지에서 찜 목록을 삭제하는 데 실패했습니다:', error);
  }
};
