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
    { label: t('all'), value: 'DALLAEMFIT' },
    { label: t('officeStretching'), value: 'OFFICE_STRETCHING' },
    { label: t('mindFulness'), value: 'MINDFULNESS' },
  ];

  const activeType = searchParams.get('type') || 'DALLAEMFIT';
  const activeTabId = activeType === 'WORKATION' ? 'WORKATION' : 'DALLAEMFIT';
  const visibleChipItems =
    activeTabId === 'WORKATION'
      ? // '워크에이션' 탭일 때는 '전체' 칩 하나만 보여줍니다.
        chipFilters.filter((chip) => chip.value === 'DALLAEMFIT')
      : // '달램핏' 탭일 때는 모든 칩을 다 보여줍니다.
        chipFilters;

  const handleTypeChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('type', value);
    params.set('offset', '0'); // 필터가 바뀌면 항상 첫 페이지로 리셋
    params.delete('location');
    params.delete('date');
    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <div className="my-8">
        <Tab
          items={tabFilter}
          selectedId={activeTabId}
          onSelect={(id) => handleTypeChange(id)}
          size="sm"
          orientation="horizontal"
          className="mb-3"
        />
        <div className="flex items-center gap-4">
          {visibleChipItems.map(({ label, value }) => (
            <Chip
              key={value}
              active={activeTabId === 'WORKATION' ? true : activeType === value}
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
