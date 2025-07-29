import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { fetchFavoritesData } from '../lib/favorite';
import { FAVORITES_QUERY_KEY } from './queryKeys';

interface UseGetFavoritesGatheringProps {
  type: string;
  favoriteIds: number[];
  enabled: boolean;
}

export const useGetFavoritesGathering = ({
  type,
  favoriteIds,
  enabled,
}: UseGetFavoritesGatheringProps) => {
  return useInfiniteQuery({
    queryKey: FAVORITES_QUERY_KEY.favorites.list({ type, favoriteIds }),
    queryFn: ({ pageParam }) => {
      return fetchFavoritesData({ ids: favoriteIds, type, pageParam });
    },
    enabled: enabled && favoriteIds.length > 0,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    placeholderData: keepPreviousData,
  });
};
