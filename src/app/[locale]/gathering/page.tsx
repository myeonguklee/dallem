import type { Metadata } from 'next';
import { Locale } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { getGatherings } from '@/entities/gathering/api';
import { parseGatheringFiltersFromSearchParams } from '@/entities/gathering/model/filters';
import { CreateGatheringButton } from '@/features/gathering/ui/CreateGatheringButton';
import { FilterSection } from '@/features/gathering/ui/FilterSection';
import { HydrationProvider, QUERY_KEYS } from '@/shared/api';
import { createQueryClient } from '@/shared/api/query/client';
import { generateGatheringMetadata } from '@/shared/lib';
import { DoubleHeartIcon } from '@/shared/ui/icon';
import { GatheringList } from '@/widgets/GatheringList/ui/GatheringList';
import { dehydrate } from '@tanstack/react-query';

interface GatheringPageProps {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  return generateGatheringMetadata(locale, messages);
}

export default async function GatheringPage({ params, searchParams }: GatheringPageProps) {
  const [locale, searchParamsObj] = await Promise.all([
    params.then(({ locale }) => locale),
    searchParams,
  ]);

  // URL 파라미터를 기반으로 필터 생성
  const filters = parseGatheringFiltersFromSearchParams(searchParamsObj);

  const [initialGatherings, t] = await Promise.all([
    getGatherings({
      ...filters,
      limit: 10,
      offset: 0,
    }),
    getTranslations({ locale, namespace: 'pages.gatherings' }),
  ]);

  // QueryClient 생성 및 초기 데이터 prefetch
  const queryClient = createQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: QUERY_KEYS.gathering.infinite(filters),
    queryFn: () => Promise.resolve(initialGatherings),
    initialPageParam: 0,
  });

  // Hydration을 위한 상태 추출
  const dehydratedState = dehydrate(queryClient);

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
        <CreateGatheringButton />
      </div>

      <FilterSection />

      {/* GatheringList만 hydration 적용 */}
      <HydrationProvider dehydratedState={dehydratedState}>
        <GatheringList
          initialGatherings={initialGatherings}
          initialFilters={filters}
        />
      </HydrationProvider>
    </div>
  );
}
