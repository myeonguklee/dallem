import { getTranslations } from 'next-intl/server';
import { Locale } from '@/i18n';

interface ReviewsPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function ReviewsPage({ params }: ReviewsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.reviews' });

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="text-2xl font-bold">{t('title')}</div>
    </div>
  );
}
