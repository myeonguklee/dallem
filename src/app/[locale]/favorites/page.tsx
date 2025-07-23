'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { getGatherings } from '@/entities/gathering/api';
import { Gathering } from '@/entities/gathering/model/types';
import { getFavoriteList } from '@/features/favorites/model/favoritesStorage';
import { ReviewTypeFilter } from '@/features/review/ReviewTypeFilter/ui/ReviewTypeFilter';
import { DoubleHeartIcon } from '@/shared/ui/icon';
import { PageInfoLayout } from '@/shared/ui/pageInfoLayout';
import { GatheringCard } from '@/widgets/GatheringCard/ui';

export default function FavoritesPage() {
  const t = useTranslations('pages.favorites');
  const [gatherings, setGatherings] = useState<Gathering[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const favoriteGatherings = getFavoriteList();

      // 찜한 게 없으면 빈 배열로 처리
      if (favoriteGatherings.length === 0) {
        setGatherings([]);
        return;
      }

      const gatheringId = favoriteGatherings.join(',');
      const res = await getGatherings({ id: gatheringId });
      setGatherings(res);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <PageInfoLayout
        infoImg={<DoubleHeartIcon size={60} />}
        title={t('title')}
        subtitle="임시데이터입니다만 "
      />

      <ReviewTypeFilter />

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
          />
        ))
      ) : (
        <div className="flex items-center justify-center py-8">
          <p className="text-gray-500">없다고</p>
        </div>
      )}
    </div>
  );
}
