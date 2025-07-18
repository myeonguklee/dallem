import { getTranslations } from 'next-intl/server';
import { ReviewCard } from '@/entities/review/ui/ReviewCard';
import { Locale } from '@/i18n';
import { AllReviewRating } from '@/widgets/AllReviewRating';
import reviewImg from '../../../entities/review/ui/reviewImg.jpg';
import userCat from '../../../entities/review/ui/userCat.jpg';

interface ReviewsPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function ReviewsPage({ params }: ReviewsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.reviews' });

  return (
    <div className="mt-20">
      <div className="text-2xl font-bold">{t('title')}</div>
      <AllReviewRating />
      <div className="mt-12">
        <ReviewCard
          score={3}
          comment="우르라라라라라라 깡깡 우르라라라라라라 깡깡 우르라라라라라라 깡깡 우르라라라라라라 깡깡 우르라라라라라라 깡깡 우르라라라라라라 깡깡우르라라라라라라 깡깡우르라라라라라라 깡깡우르라라라라라라 깡깡"
          dateTime="2024-10-19T01:21:47.762Z"
          userName="이링"
          userImg={userCat}
          reviewImg={reviewImg}
          gatheringName="오늘도 힘차게 화이팅"
          location="신림"
        />
      </div>
    </div>
  );
}
