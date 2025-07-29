'use client';

import { Suspense } from 'react';
import { GatheringsJoinedContent } from '@/features/my-page/ui/GatheringsJoinedContent';
import { PageContentSkeleton } from '@/widgets/MyPageSkeleton';

export default function GatheringsJoined() {
  return (
    <Suspense fallback={<PageContentSkeleton />}>
      <GatheringsJoinedContent />
    </Suspense>
  );
}
