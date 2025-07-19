import { getTranslations } from 'next-intl/server';
import { ReviewTypeFilter } from '@/features/review/ReveiwTypeFilter/ui/ReviewTypeFilter';
import { Locale } from '@/i18n';
import { PencilIcon } from '@/shared/ui/icon';
import { PageInfoLayout } from '@/shared/ui/pageInfoLayout';
import { AllReviewRating } from '@/widgets/AllReviewRating';
import { ReviewList } from '@/widgets/ReviewList/ui/ReviewList';

interface ReviewsPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function ReviewsPage({ params }: ReviewsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.reviews' });

  return (
    <div className="mt-10">
      <div className="hidden text-2xl font-bold">{t('title')}</div>
      <PageInfoLayout
        infoImg={<PencilIcon size={60} />}
        title="모든 리뷰"
        subtitle="같이 달램을 이용한 분들은 이렇게 느꼈어요 🥰"
      />
      <ReviewTypeFilter />
      <AllReviewRating />
      <div className="mt-12">
        <ReviewList />
      </div>
    </div>
  );
}
