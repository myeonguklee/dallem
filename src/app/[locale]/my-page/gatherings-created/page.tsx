'use client';

import { Suspense } from 'react';
import { GatheringsCreatedContent } from '@/entities/gathering/ui';
import { PageContentSkeleton } from '@/widgets/MyPageSkeleton';

export default function GatheringsCreated() {
  return (
    <Suspense fallback={<PageContentSkeleton />}>
      <GatheringsCreatedContent />
    </Suspense>
  );
}
