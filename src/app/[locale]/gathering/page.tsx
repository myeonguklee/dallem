import { getTranslations } from 'next-intl/server';
import { getGatherings } from '@/entities/gathering/api';
import { QUERY_KEYS } from '@/entities/gathering/api/queryKeys';
import { parseGatheringFiltersFromSearchParams } from '@/entities/gathering/model/filters';
import { CreateGatheringButton, FilterSection } from '@/features/gathering/ui';
import { HydrationProvider } from '@/shared/api';
import { createQueryClient } from '@/shared/api/query/client';
import { DoubleHeartIcon } from '@/shared/ui/icon';
import { GatheringList } from '@/widgets/GatheringList/ui/GatheringList';
import { dehydrate } from '@tanstack/react-query';

export default async function GatheringPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const t = await getTranslations('pages.gathering');

  const searchParamsObj = await searchParams;

  // URL 파라미터를 기반으로 필터 생성
  const filters = parseGatheringFiltersFromSearchParams(searchParamsObj);

  // SSR로 초기 모임 데이터 가져오기 (첫 페이지만)
  const initialGatherings = await getGatherings({
    ...filters,
    limit: 10,
    offset: 0,
  });

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
