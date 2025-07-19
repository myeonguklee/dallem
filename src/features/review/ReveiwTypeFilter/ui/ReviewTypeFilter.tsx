'use client';

import { useState } from 'react';
import { Chip } from '@/shared/ui/chip';
import { DalaemfitIcon, WorkationIcon } from '@/shared/ui/icon';
import { Tab } from '@/shared/ui/tab';

const tabFilter = [
  {
    id: 'dallaemfit',
    label: '달램핏',
    icon: <DalaemfitIcon />,
  },
  {
    id: 'workation',
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
  const [selectedTab, setSelectedTab] = useState('dallaemfit');
  const [active, setActive] = useState('all');

  return (
    <>
      <div className="my-8">
        <Tab
          items={tabFilter}
          selectedId={selectedTab}
          onSelect={setSelectedTab}
          size="sm"
          orientation="horizontal"
          className="mb-3"
        />
        <div className="flex items-center gap-4">
          {chipFilters.map(({ label, value }) => (
            <Chip
              key={value}
              active={active === value}
              onClick={() => setActive(value)}
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
