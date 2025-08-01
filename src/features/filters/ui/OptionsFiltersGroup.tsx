'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n';
import { Filter } from '@/shared/ui/filter';
import { Sort } from '@/shared/ui/sort';
import { DateFilter } from './DateFilter';

interface OptionsFiltersGroupProps {
  sortValue: string[];
  defaultSort: string;
}

export const OptionsFiltersGroup = ({ sortValue, defaultSort }: OptionsFiltersGroupProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('filters');

  // 지역 필터 옵션
  const regionOptions = [
    { label: t('regions.all'), value: '전체보기' },
    { label: t('regions.konkuk'), value: '건대입구' },
    { label: t('regions.euljiro'), value: '을지로3가' },
    { label: t('regions.sinrim'), value: '신림' },
    { label: t('regions.hongdae'), value: '홍대입구' },
  ];

  // 정렬 옵션
  const sortOptions = [
    { label: t('sort.deadline'), value: 'registrationEnd' },
    { label: t('sort.participants'), value: 'participantCount' },
    { label: t('sort.createdAt'), value: 'createdAt' },
    { label: t('sort.date'), value: 'dateTime' },
    { label: t('sort.scoreTop'), value: 'score' },
  ];

  // URL에서 현재 값들 가져오기
  const selectedLocation = searchParams.get('location') || '전체보기';
  const selectedSortBy = searchParams.get('sortBy') || defaultSort;
  const filteredSortOptions = sortOptions
    .filter((opt) => sortValue.includes(opt.value))
    .sort((a, b) => sortValue.indexOf(a.value) - sortValue.indexOf(b.value));

  const updateFilter = (filterType: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    // 지역 전체일 때는 location 파라미터 제거
    if (filterType === 'location' && value === '전체보기') {
      params.delete('location');
    } else {
      params.set(filterType, value);
    }

    router.push({
      pathname: pathname as '/reviews' | '/gathering' | '/favorites',
      query: Object.fromEntries(params.entries()),
    });
  };

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2">
        <Filter
          options={regionOptions}
          selected={selectedLocation}
          onChange={(value) => updateFilter('location', value)}
          allValue="전체보기"
        />
        <DateFilter />
      </div>
      <Sort
        options={filteredSortOptions}
        selected={selectedSortBy}
        onChange={(value) => updateFilter('sortBy', value)}
      />
    </div>
  );
};
