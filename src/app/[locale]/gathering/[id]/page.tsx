import { Suspense } from 'react';
import { GatheringDetailLayout } from '@/entities/gathering-detail/ui';

export default async function GatheringDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    // 에러 바운더리 사용시 수정 예정
    // <ErrorBoundary fallback={<p>데이터를 불러오는 중 에러가 발생했습니다.</p>}>
    // </ErrorBoundary>
    <Suspense fallback={<p>모임 정보를 불러오는 중...</p>}>
      <GatheringDetailLayout id={Number(id)} />
    </Suspense>
  );
}
