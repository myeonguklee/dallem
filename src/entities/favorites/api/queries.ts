import { QUERY_KEYS } from '@/shared/api';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { fetchFavoritesData } from '../lib/favorite';

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
    queryKey: QUERY_KEYS.favorites.list({ type, favoriteIds }),
    queryFn: ({ pageParam }) => {
      return fetchFavoritesData({ ids: favoriteIds, type, pageParam });
    },
    enabled: enabled && favoriteIds.length > 0,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    placeholderData: keepPreviousData,
  });
};
