'use client';

import { useEffect, useState } from 'react';
import { getFavoriteList } from '@/features/favorites/model/favoritesStorage';
import { InfiniteScrollObserver } from '@/shared/ui/InfiniteScrollObserver/InfiniteScrollObserver';
import { GatheringCard } from '@/widgets/GatheringCard/ui';
import { useGetFavoritesGathering } from '../api/queries';

interface FavoritesListProps {
  type: string;
}

export const FavoritesList = ({ type }: FavoritesListProps) => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  useEffect(() => {
    const ids = getFavoriteList(); // localStorage 접근
    setFavoriteIds(ids);
  }, []);

  // favoriteIds가 변경되면 수동으로 쿼리 무효화
  const { data, fetchNextPage, hasNextPage, isFetching } = useGetFavoritesGathering({
    type,
    favoriteIds,
    enabled: favoriteIds.length > 0,
  });

  const allGatherings = data?.pages.flatMap((page) => page.items) ?? [];

  const handleToggleFavorite = (toggledId: number) => {
    setFavoriteIds((prev) => prev.filter((id) => id !== toggledId));
  };

  return (
    <>
      <div className="w-full">
        <div className="w-full space-y-4">
          {allGatherings.length > 0 ? (
            allGatherings.map((gathering) => (
              <GatheringCard
                key={gathering.id}
                gatheringId={gathering.id}
                gatheringType={gathering.type}
                gatheringName={gathering.name}
                gatheringLocation={gathering.location}
                gatheringDateTime={new Date(gathering.dateTime)}
                gatheringRegistrationEnd={new Date(gathering.registrationEnd)}
                gatheringParticipantCount={gathering.participantCount}
                gatheringCapacity={gathering.capacity}
                gatheringImage={gathering.image}
                isCanceled={!!gathering.canceledAt}
                onToggle={() => handleToggleFavorite(gathering.id)}
              />
            ))
          ) : (
            <div className="flex items-center justify-center py-8">
              <p className="text-gray-500">찜한 목록이 없습니다.</p>
            </div>
          )}
        </div>

        {allGatherings.length > 0 && (
          <InfiniteScrollObserver
            onFetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetching}
          />
        )}
      </div>
    </>
  );
};
