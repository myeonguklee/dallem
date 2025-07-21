'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Chip } from '@/shared/ui/chip';
import { DalaemfitIcon, WorkationIcon } from '@/shared/ui/icon';
import { Tab } from '@/shared/ui/tab';

const tabFilter = [
  {
    id: 'DALLAEMFIT',
    label: '달램핏',
    icon: <DalaemfitIcon />,
  },
  {
    id: 'WORKATION',
    label: '워케이션',
    icon: <WorkationIcon />,
  },
];

const chipFilters = [
  { label: '전체', value: 'all' },
  { label: '오피스 스트레칭', value: 'OFFICE_STRETCHING' },
  { label: '마인드 폴니스', value: 'MINDFULNESS' },
];

export const ReviewTypeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeType = searchParams.get('type') || 'all';

  const handleTypeChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === 'all') {
      params.delete('type');
    } else {
      params.set('type', value);
    }

    params.set('offset', '0'); // 필터 변경시 첫 페이지로
    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <div className="my-8">
        <Tab
          items={tabFilter}
          selectedId={activeType}
          onSelect={(id) => handleTypeChange(id)}
          size="sm"
          orientation="horizontal"
          className="mb-3"
        />
        <div className="flex items-center gap-4">
          {chipFilters.map(({ label, value }) => (
            <Chip
              key={value}
              active={activeType === value}
              onClick={() => handleTypeChange(value)}
              className="cursor-pointer"
            >
              {label}
            </Chip>
          ))}
        </div>
      </div>
    </>
  );
};
