'use client';

import { Suspense } from 'react';
import { ReviewsContent } from '@/entities/review/ui/ReviewsContent';
import { ReviewsSkeleton } from '@/widgets/MyPageSkeleton';

export default function Reviews() {
  return (
    <Suspense fallback={<ReviewsSkeleton />}>
      <ReviewsContent />
    </Suspense>
  );
}
