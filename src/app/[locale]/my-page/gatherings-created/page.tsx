'use client';

import { Suspense } from 'react';
import { GatheringsCreatedContent } from '@/features/my-page/ui/GatheringsCreatedContent';
import { PageContentSkeleton } from '@/widgets/MyPageSkeleton';

export default function GatheringsCreated() {
  return (
    <Suspense fallback={<PageContentSkeleton />}>
      <GatheringsCreatedContent />
    </Suspense>
  );
}
