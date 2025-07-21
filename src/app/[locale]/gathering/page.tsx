import { getTranslations } from 'next-intl/server';
import { getGatherings } from '@/entities/gathering/api';
import { parseGatheringFiltersFromSearchParams } from '@/entities/gathering/model/filters';
import { FilterSection } from '@/features/gathering/ui';
import { Locale } from '@/i18n';
import { Button } from '@/shared/ui/button';
import { DoubleHeartIcon } from '@/shared/ui/icon';
import { GatheringCard } from '@/widgets/GatheringCard/ui';

interface GatheringPageProps {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function GatheringPage({ params, searchParams }: GatheringPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.gatherings' });

  const searchParamsObj = await searchParams;

  // URL 파라미터를 기반으로 필터 생성
  const filters = parseGatheringFiltersFromSearchParams(searchParamsObj);

  // 모임 데이터 가져오기
  const gatherings = await getGatherings(filters);

  return (
    <div className="flex flex-1 flex-col gap-2">
      <div className="mt-5 flex h-20 w-full gap-4">
        <DoubleHeartIcon />
        <div className="flex h-full flex-col justify-evenly">
          <p className="text-sm font-medium">{t('header.subtitle')}</p>
          <p className="text-2xl font-semibold">{t('header.title')}</p>
        </div>
      </div>

      <div className="flex justify-end">
        <Button className="">{t('createButton')}</Button>
      </div>

      <FilterSection />

      {/* 모임 카드 목록 */}
      <div className="flex flex-col gap-4">
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
            <p className="text-gray-500">{t('noGatherings')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
