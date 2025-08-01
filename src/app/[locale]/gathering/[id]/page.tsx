import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Locale } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { GatheringDetailLayout } from '@/entities/gathering-detail/ui';
import { getGathering } from '@/entities/gathering/api';
import { generateGatheringDetailMetadata } from '@/shared/lib';

interface GatheringDetailPageProps {
  params: Promise<{ id: string; locale: Locale }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: Locale }>;
}): Promise<Metadata> {
  const { id, locale } = await params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    const messages = await getMessages({ locale });
    const notFoundMetadata = messages.metadata.notFound.gathering as {
      title: string;
      message: string;
    };
    return {
      title: notFoundMetadata.title,
    };
  }

  try {
    // 모임 데이터 가져오기
    const gathering = await getGathering(numericId);
    const messages = await getMessages({ locale });

    return generateGatheringDetailMetadata(locale, messages, {
      id: gathering.id,
      name: gathering.name,
      type: gathering.type,
      location: gathering.location,
      dateTime: gathering.dateTime,
      image: gathering.image,
    });
  } catch {
    // 모임을 찾을 수 없는 경우
    const messages = await getMessages({ locale });
    const notFoundMetadata = messages.metadata.notFound.gathering as {
      title: string;
      message: string;
    };
    return {
      title: notFoundMetadata.title,
    };
  }
}

export default async function GatheringDetailPage({ params }: GatheringDetailPageProps) {
  const { locale, id } = await params;

  const t = await getTranslations({ locale, namespace: 'pages.gathering.detail' });

  const numericId = Number(id);

  if (isNaN(numericId)) {
    notFound();
  }
  return (
    // 에러 바운더리 사용시 수정 예정
    // <ErrorBoundary fallback={<p>데이터를 불러오는 중 에러가 발생했습니다.</p>}>
    // </ErrorBoundary>
    <Suspense fallback={<p>{t('loading')}</p>}>
      <GatheringDetailLayout id={numericId} />
    </Suspense>
  );
}
