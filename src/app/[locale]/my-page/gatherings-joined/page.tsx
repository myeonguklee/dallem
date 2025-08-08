'use client';

import { Suspense } from 'react';
import { GatheringsJoinedContent } from '@/entities/gathering/ui';
import { PageContentSkeleton } from '@/widgets/MyPageSkeleton';

export default function GatheringsJoined() {
  return (
    <Suspense fallback={<PageContentSkeleton />}>
      <GatheringsJoinedContent />
    </Suspense>
  );
}
