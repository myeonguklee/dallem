'use client';

import { useState } from 'react';
import { getFavoriteList } from '@/features/favorites/model/favoritesStorage';
import { InfiniteScrollObserver } from '@/shared/ui/InfiniteScrollObserver/InfiniteScrollObserver';
import { GatheringCard } from '@/widgets/GatheringCard/ui';
import { useGetFavoritesGathering } from '../api/queries';

interface FavoritesListProps {
  type: string;
}

export const FavoritesList = ({ type }: FavoritesListProps) => {
  const [favoriteIds, setFavoriteIds] = useState<number[]>(() => getFavoriteList());

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } = useGetFavoritesGathering({
    type,
    favoriteIds,
  });

  const allGatherings = data?.pages.flatMap((page) => page.items) ?? [];
  // 4. 찜 해제 함수: 로컬 스토리지와 state만 변경!
  const handleToggleFavorite = (toggledId: number) => {
    // 컴포넌트의 state 업데이트 -> 이로 인해 쿼리 키가 변경되고 React Query가 자동 리프레시!
    setFavoriteIds((prev) => prev.filter((id) => id !== toggledId));
  };

  if (isLoading) {
    return <div className="py-8 text-center">목록을 불러오는 중...</div>;
  }

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
              <p className="text-gray-500">없다고</p>
            </div>
          )}
        </div>

        <InfiniteScrollObserver
          onFetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetching}
        />
      </div>
    </>
  );
};
