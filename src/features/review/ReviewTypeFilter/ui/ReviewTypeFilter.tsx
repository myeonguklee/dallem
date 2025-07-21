'use client';

import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { Chip } from '@/shared/ui/chip';
import { DalaemfitIcon, WorkationIcon } from '@/shared/ui/icon';
import { Tab } from '@/shared/ui/tab';

export const ReviewTypeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // i18n 문자 변환
  const t = useTranslations('pages.reviews');
  const tabFilter = [
    {
      id: 'DALLAEMFIT',
      label: t('run'),
      icon: <DalaemfitIcon />,
    },
    {
      id: 'WORKATION',
      label: t('workation'),
      icon: <WorkationIcon />,
    },
  ];

  const chipFilters = [
    { label: t('all'), value: 'all' },
    { label: t('officeStretching'), value: 'OFFICE_STRETCHING' },
    { label: t('mindFulness'), value: 'MINDFULNESS' },
  ];

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
