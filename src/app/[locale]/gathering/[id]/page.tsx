import { getTranslations } from 'next-intl/server';
import { GatheringDetailLayout } from '@/entities/gathering-detail/ui';
import { Locale } from '@/i18n';

interface GatheringDetailPageProps {
  params: Promise<{ id: string; locale: Locale }>;
}

export default async function GatheringDetailPage({ params }: GatheringDetailPageProps) {
  const { id, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.gathering.detail' });
  console.log('GatheringDetailPage', { id, locale, t });
  return <GatheringDetailLayout id={id} />;
}
