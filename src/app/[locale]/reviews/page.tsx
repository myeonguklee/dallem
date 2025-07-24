import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { REVIEW_QUERY_KEYS } from '@/entities/review/api/queryKeys';
import { getReviewList, getReviewScore } from '@/entities/review/api/reviewApi';
import { ReviewLocation, ReviewType } from '@/entities/review/model/type';
import { ReviewListFilter } from '@/features/review/ReviewListFilter/ui/ReviewListFilter';
import { ReviewSort } from '@/features/review/ReviewSort/ui/ReviewSort';
import { ReviewTypeFilter } from '@/features/review/ReviewTypeFilter/ui/ReviewTypeFilter';
import { Locale } from '@/i18n';
import { PencilIcon } from '@/shared/ui/icon';
import { PageInfoLayout } from '@/shared/ui/pageInfoLayout';
import { AllReviewRating } from '@/widgets/AllReviewRating';
import { ReviewList } from '@/widgets/ReviewList/ui/ReviewList';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

interface ReviewsPageProps {
  params: { locale: Locale };
  searchParams: {
    type?: string;
    location?: string;
    date?: string;
    sortBy?: string;
    sortOrder?: string;
    limit?: string;
    offset?: string;
  };
}

export default async function ReviewsPage({ params, searchParams }: ReviewsPageProps) {
  const { locale } = params;
  const filterQuery = searchParams;
  const t = await getTranslations({ locale, namespace: 'pages.reviews' });

  const queryClient = new QueryClient();
  const reviewParams = {
    type: filterQuery.type as ReviewType | undefined,
    location: filterQuery.location as ReviewLocation | undefined,
    date: filterQuery.date ?? undefined,
    sortBy: filterQuery.sortBy ?? undefined,
    sortOrder: filterQuery.sortOrder || 'desc',
    limit: parseInt(filterQuery.limit || '10'),
    offset: parseInt(filterQuery.offset || '0'),
  };

  await queryClient.prefetchInfiniteQuery({
    queryKey: REVIEW_QUERY_KEYS.review.list(reviewParams),
    queryFn: () => getReviewList(reviewParams),
    initialPageParam: 0,
  });

  await queryClient.prefetchQuery({
    queryKey: REVIEW_QUERY_KEYS.review.scores({ type: reviewParams.type }),
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
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ReviewTypeFilter />
        <Suspense fallback={t('loading')}>
          <AllReviewRating type={reviewParams.type} />
        </Suspense>
        <div className="mb-4 flex items-center justify-between">
          <ReviewListFilter />
          <ReviewSort />
        </div>
        <Suspense fallback={t('loading')}>
          <div className="mt-12">
            <ReviewList filters={reviewParams} />
          </div>
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
