'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { getGatherings } from '@/entities/gathering/api';
import { parseGatheringFiltersFromSearchParams } from '@/entities/gathering/model/filters';
import { Gathering } from '@/entities/gathering/model/types';
import { getFavoriteList } from '@/features/favorites/model/favoritesStorage';
import { TypeFilterGroup } from '@/features/filters/ui/TypeFilterGroup';
import { DoubleHeartIcon } from '@/shared/ui/icon';
import { PageInfoLayout } from '@/shared/ui/pageInfoLayout';
import { GatheringCard } from '@/widgets/GatheringCard/ui';

export default function FavoritesPage() {
  const t = useTranslations('pages.favorites');
  const searchParams = useSearchParams();
  const type = searchParams.get('type') ?? 'DALLAEMFIT';

  const [gatherings, setGatherings] = useState<Gathering[]>([]);

  const fetchFavorites = async () => {
    const favorites = getFavoriteList();
    if (favorites.length === 0) {
      setGatherings([]);
      return;
    }

    try {
      const gatheringId = favorites.join(',');
      const searchParamsObj = {
        id: gatheringId,
        type,
      };
      const filters = parseGatheringFiltersFromSearchParams(searchParamsObj);
      const res = await getGatherings({
        ...filters,
        limit: 10,
        offset: 0,
      });

      setGatherings(res);
    } catch (error) {
      console.error('찜한 모임을 불러오는 데 실패했습니다:', error);
    }
  };

  useEffect(() => {
    fetchFavorites();
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
              onToggle={fetchFavorites}
            />
          ))
        ) : (
          <div className="flex items-center justify-center py-8">
            <p className="text-gray-500">없다고</p>
          </div>
        )}
      </div>
    </div>
  );
}
