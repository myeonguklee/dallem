import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { GatheringDetailLayout } from '@/entities/gathering-detail/ui';
import { Locale } from '@/i18n';

interface GatheringDetailPageProps {
  params: Promise<{ id: string; locale: Locale }>;
}

export default async function GatheringDetailPage({ params }: GatheringDetailPageProps) {
  const { id, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.gathering.detail' });

  const numericId = Number(id);
  if (isNaN(numericId)) {
    notFound();
  }
  console.log('GatheringDetailPage', { id, locale, t });

  return (
    // 에러 바운더리 사용시 수정 예정
    // <ErrorBoundary fallback={<p>데이터를 불러오는 중 에러가 발생했습니다.</p>}>
    // </ErrorBoundary>
    <Suspense fallback={<p>모임 정보를 불러오는 중...</p>}>
      <GatheringDetailLayout id={numericId} />
    </Suspense>
  );
}
