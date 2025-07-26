'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Chip } from '@/shared/ui/chip';
import { DalaemfitIcon, WorkationIcon } from '@/shared/ui/icon';
import { Tab } from '@/shared/ui/tab';

export const TypeFilterGroup = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const t = useTranslations('filters');

  // 카테고리 탭 옵션
  const categoryItems = [
    { id: 'DALLAEMFIT', label: t('categories.dallaemfit'), icon: <DalaemfitIcon /> },
    { id: 'WORKATION', label: t('categories.workation'), icon: <WorkationIcon /> },
  ];

  // 활동 칩 옵션
  const activityItems = [
    { value: 'DALLAEMFIT', label: t('activities.all') },
    { value: 'OFFICE_STRETCHING', label: t('activities.officeStretching') },
    { value: 'MINDFULNESS', label: t('activities.mindfulness') },
  ];

  // 워케이션 활동 칩 옵션
  const workationActivityItems = [{ value: 'WORKATION', label: t('activities.all') }];

  const activeType = searchParams.get('type') || 'DALLAEMFIT';
  const activeTabId = activeType === 'WORKATION' ? 'WORKATION' : 'DALLAEMFIT';
  const visibleChipItems = activeTabId === 'WORKATION' ? workationActivityItems : activityItems;

  const handleTypeChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('type', value);
    if (value !== activeType) {
      params.delete('offset');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="my-8 flex flex-col gap-4">
      <Tab
        items={categoryItems}
        selectedId={activeTabId}
        onSelect={handleTypeChange}
        className="gap-4"
      />
      <div className="flex gap-2">
        {visibleChipItems.map(({ label, value }) => (
          <Chip
            key={value}
            active={activeType === value}
            onClick={() => handleTypeChange(value)}
            className="cursor-pointer whitespace-nowrap"
          >
            {label}
          </Chip>
        ))}
      </div>
    </div>
  );
};
