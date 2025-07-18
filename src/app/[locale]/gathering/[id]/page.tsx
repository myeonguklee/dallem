import { getTranslations } from 'next-intl/server';
import { Locale } from '@/i18n';

interface GatheringDetailPageProps {
  params: Promise<{ id: string; locale: Locale }>;
}

export default async function GatheringDetailPage({ params }: GatheringDetailPageProps) {
  const { id, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.gathering.detail' });

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="text-2xl font-bold">
        {t('title')} - ID: {id}
      </div>
    </div>
  );
}
