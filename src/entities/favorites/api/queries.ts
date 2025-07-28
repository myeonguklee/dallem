import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchFavoritesData } from '../lib/favorite';
import { FAVORITES_QUERY_KEY } from './queryKeys';

interface UseGetFavoritesGatheringProps {
  type: string;
  favoriteIds: number[];
}

export const useGetFavoritesGathering = ({ type, favoriteIds }: UseGetFavoritesGatheringProps) => {
  return useInfiniteQuery({
    queryKey: FAVORITES_QUERY_KEY.favorites.list(type, favoriteIds),
    queryFn: ({ pageParam }) => fetchFavoritesData({ ids: favoriteIds, type, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
  });
};
