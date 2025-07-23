// 모임 목록 페이지와 모임 찜 페이지 찜 버튼 상태 공유,
import { create } from 'zustand';

// 수동으로 직접 로컬스토리지 get, set, remove 하던 걸 persist가 대신한다.
// No Prop Drilling + 자동 동기화 ( 어디서 찜을 눌러도 모든 컴포넌트가 즉시 업데이트 ) 위한 zustand 최적화

interface FavoritesState {
  favorites: number[];
  isFavorite: (gatheringId: number) => boolean;
  toggleFavorite: (gatheringId: number) => void;
  clearFavorites: () => void;
}

// 로컬스토리지 쿼리 키
const FAVORITES_KEY = 'Like';

// 스토어 생성
export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: (() => {
    try {
      if (typeof window !== 'undefined') {
        const data = localStorage.getItem(FAVORITES_KEY);
        return data ? JSON.parse(data) : [];
      }
    } catch (error) {
      console.error('로컬 스토리지에서 찜 목록을 불러오는 데 실패했습니다:', error);
    }
    return [];
  })(),

  // id 확인 유무
  isFavorite: (gatheringId) => get().favorites.includes(gatheringId),

  //  저장 및 해제하기
  toggleFavorite: (gatheringId) => {
    const prev = get().favorites;
    const updated = prev.includes(gatheringId)
      ? prev.filter((x) => x !== gatheringId)
      : [...prev, gatheringId];

    if (typeof window !== 'undefined') {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    }

    set({ favorites: updated });
  },

  //전체 삭제
  clearFavorites: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(FAVORITES_KEY);
    }
    set({ favorites: [] });
  },
}));
