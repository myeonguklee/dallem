'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { getGatherings } from '@/entities/gathering/api';
import { parseGatheringFiltersFromSearchParams } from '@/entities/gathering/model/filters';
import { Gathering } from '@/entities/gathering/model/types';
import { getFavoriteList } from '@/features/favorites/model/favoritesStorage';
import { TypeFilterGroup } from '@/features/filters/ui/TypeFilterGroup';
import { InfiniteScrollObserver } from '@/shared/ui/InfiniteScrollObserver/InfiniteScrollObserver';
import { DoubleHeartIcon } from '@/shared/ui/icon';
import { PageInfoLayout } from '@/shared/ui/pageInfoLayout';
import { GatheringCard } from '@/widgets/GatheringCard/ui';

export default function FavoritesPage() {
  const t = useTranslations('pages.favorites');
  const searchParams = useSearchParams();
  const type = searchParams.get('type') ?? 'DALLAEMFIT';

  // 서버에서 받아온 모임 목록
  const [gatherings, setGatherings] = useState<Gathering[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const fetchFavoritesList = async () => {
    const allFavorites = getFavoriteList();
    setFavorites(allFavorites);
    if (isFetching || !hasNextPage) return;

    setIsFetching(true);
    const PAGE_SIZE = 10;
    const startIndex = currentPage * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const currentIds = favorites.slice(startIndex, endIndex);

    if (currentIds.length === 0) {
      setHasNextPage(false);
      setIsFetching(false);
      return;
    }

    try {
      // API에 전달할 id 파라미터 생성 (예: "1,2,3,...")
      const gatheringId = currentIds.join(',');
      const filters = parseGatheringFiltersFromSearchParams({ id: gatheringId, type });

      // id에 대한 데이터 요청
      const res = await getGatherings({ ...filters });
      // setGatherings((prev) => [...prev, ...res]);
      setGatherings((prev) => {
        const newGatherings = res.filter(
          (newGath) => !prev.some((prevGath) => prevGath.id === newGath.id),
        );
        return [...prev, ...newGatherings];
      });

      setCurrentPage((prev) => prev + 1);
      setHasNextPage(endIndex < favorites.length);
    } catch (error) {
      console.error(error);
      setHasNextPage(false);
    } finally {
      setIsFetching(false);
    }
  };

  //찜 해제 함수
  const handleToggleFavorite = (toggledId: number) => {
    setGatherings((prev) => prev.filter((gathering) => gathering.id !== toggledId));
    setFavorites((prev) => prev.filter((favId) => favId !== toggledId));
  };

  useEffect(() => {
    fetchFavoritesList();
  }, []);

  useEffect(() => {
    setGatherings([]);
    setCurrentPage(0);
    setHasNextPage(true);
    setIsFetching(false);
  }, [type]);

  return (
    <div className="mt- mt-10 mb-20 flex flex-1 flex-col items-start">
      <div className="w-full">
        <PageInfoLayout
          infoImg={<DoubleHeartIcon size={60} />}
          title={t('title')}
          subtitle="임시데이터입니다만 "
        />
      </div>

      <TypeFilterGroup />

      <div className="w-full space-y-4">
        {gatherings.length > 0 ? (
          gatherings.map((gathering) => (
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
        onFetchNextPage={fetchFavoritesList}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetching}
      />
    </div>
  );
}
