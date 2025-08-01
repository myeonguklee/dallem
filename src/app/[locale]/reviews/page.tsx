import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Locale } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { getReviewList, getReviewScore } from '@/entities/review/api/services';
import { parseReviewFilters } from '@/entities/review/model/filtres';
import { OptionsFiltersGroup } from '@/features/filters/ui/OptionsFiltersGroup';
import { TypeFilterGroup } from '@/features/filters/ui/TypeFilterGroup';
import { HydrationProvider, QUERY_KEYS } from '@/shared/api';
import { generateReviewsMetadata } from '@/shared/lib';
import { PencilIcon } from '@/shared/ui/icon';
import { PageInfoLayout } from '@/shared/ui/pageInfoLayout';
import { AllReviewRating } from '@/widgets/AllReviewRating';
import { ReviewList } from '@/widgets/ReviewList/ui/ReviewList';
import { QueryClient, dehydrate } from '@tanstack/react-query';

interface ReviewsPageProps {
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
  return generateReviewsMetadata(locale, messages);
}

const sortOptions = ['createdAt', 'score', 'participantCount'];

export default async function ReviewsPage({ params, searchParams }: ReviewsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.reviews' });

  const filterQuery = await searchParams;
  const reviewParams = parseReviewFilters(filterQuery);

  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: QUERY_KEYS.review.list(reviewParams),
    queryFn: () => getReviewList(reviewParams),
    initialPageParam: 0,
  });

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.review.scores({ type: reviewParams.type }),
    queryFn: () => getReviewScore({ type: reviewParams.type }),
  });

  return (
    <div className="mx-auto mt-10 mb-20 w-full max-w-[1200px]">
      <div className="hidden text-2xl font-bold">{t('title')}</div>
      <PageInfoLayout
        infoImg={<PencilIcon size={60} />}
        title={t('title')}
        subtitle={t('subTitle')}
      />

      <TypeFilterGroup />
      <HydrationProvider dehydratedState={dehydrate(queryClient)}>
        <Suspense fallback={t('loading')}>
          <AllReviewRating type={reviewParams.type} />
        </Suspense>
        <div className="mb-4 flex items-center justify-between">
          <OptionsFiltersGroup
            sortValue={sortOptions}
            defaultSort="createdAt"
          />
        </div>
        <Suspense fallback={t('loading')}>
          <div className="mt-8 min-h-[28rem]">
            <ReviewList filters={reviewParams} />
          </div>
        </Suspense>
      </HydrationProvider>
    </div>
  );
}
