'use client';

import dynamic from 'next/dynamic';

const CreateGatheringButton = dynamic(
  () => import('./CreateGatheringButton').then((mod) => ({ default: mod.CreateGatheringButton })),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-end">
        <div className="h-10 w-32 animate-pulse rounded-lg bg-gray-200" />
      </div>
    ),
  },
);

const FilterSection = dynamic(
  () => import('./FilterSection').then((mod) => ({ default: mod.FilterSection })),
  {
    ssr: false,
    loading: () => <div className="h-16 animate-pulse rounded-lg bg-gray-200" />,
  },
);

export function GatheringPageWrapper() {
  return (
    <>
      <div className="flex justify-end">
        <CreateGatheringButton />
      </div>

      <FilterSection />
    </>
  );
}
