'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useGetGatheringsInfinite } from '@/entities/gathering/api/queries';
import { GatheringFilters } from '@/entities/gathering/model/types';
import { Gathering } from '@/entities/gathering/model/types';
import { GatheringCard } from '@/widgets/GatheringCard/ui';

interface GatheringListProps {
  initialGatherings: Gathering[];
  initialFilters: GatheringFilters;
}

export function GatheringList({ initialGatherings, initialFilters }: GatheringListProps) {
  const t = useTranslations('pages.gatherings');
  const observerRef = useRef<HTMLDivElement>(null);

  // 무한스크롤 쿼리
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError } =
    useGetGatheringsInfinite(initialFilters);

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0,
        rootMargin: '100px',
      },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 모든 페이지의 데이터를 평면화
  const allGatherings = data?.pages.flatMap((page) => page) ?? initialGatherings;

  if (isLoading && !data) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-gray-500">{t('loading')}</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-red-500">{t('error')}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {allGatherings.length > 0 ? (
        <>
          {allGatherings.map((gathering, index) => (
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
              isEnded={new Date(gathering.dateTime) < new Date()}
              isFirstCard={index === 0}
            />
          ))}

          {/* 무한스크롤 트리거 */}
          <div
            ref={observerRef}
            className="h-4"
          />

          {/* 로딩 상태 표시 */}
          {isFetchingNextPage && (
            <div className="flex items-center justify-center py-4">
              <p className="text-gray-500">{t('loadingMore')}</p>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center py-8">
          <p className="text-gray-500">{t('noGatherings')}</p>
        </div>
      )}
    </div>
  );
}
