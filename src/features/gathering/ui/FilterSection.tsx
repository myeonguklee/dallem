'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Chip } from '@/shared/ui/chip';
import { Filter } from '@/shared/ui/filter';
import { DalaemfitIcon, WorkationIcon } from '@/shared/ui/icon';
import { Sort } from '@/shared/ui/sort';
import { Tab } from '@/shared/ui/tab';

// 카테고리 탭 옵션
const categoryItems = [
  { id: 'DALLAEMFIT', label: '달램핏', icon: <DalaemfitIcon /> },
  { id: 'WORKATION', label: '워케이션', icon: <WorkationIcon /> },
];

// 활동 칩 옵션
const activityItems = [
  { value: 'DALLAEMFIT', label: '전체' },
  { value: 'OFFICE_STRETCHING', label: '오피스 스트레칭' },
  { value: 'MINDFULNESS', label: '마인드풀니스' },
];

// 워케이션 활동 칩 옵션
const workationActivityItems = [{ value: 'WORKATION', label: '전체' }];

// 지역 필터 옵션
const regionOptions = [
  { label: '지역 전체', value: '전체보기' },
  { label: '건대입구', value: '건대입구' },
  { label: '을지로3가', value: '을지로3가' },
  { label: '신림', value: '신림' },
  { label: '홍대입구', value: '홍대입구' },
];

// 정렬 옵션
const sortOptions = [
  { label: '마감 임박', value: 'registrationEnd' },
  { label: '참여 인원 순', value: 'participantCount' },
  { label: '모임 날짜 순', value: 'dateTime' },
];

export const FilterSection = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // URL에서 현재 필터 값들 가져오기
  const selectedType = searchParams.get('type') || 'DALLAEMFIT';
  const selectedLocation = searchParams.get('location') || '전체보기';
  const selectedSortBy = searchParams.get('sortBy') || 'registrationEnd';

  // 필터 업데이트 함수
  const updateFilter = (filterType: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    // 지역 전체일 때는 location 파라미터 제거
    if (filterType === 'location' && value === '전체보기') {
      params.delete('location');
    } else {
      params.set(filterType, value);
    }

    params.set('offset', '0');
    router.push(`${pathname}?${params.toString()}`);
  };

  // 카테고리 변경 시 활동 필터 리셋
  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('type', value);
    params.set('offset', '0');
    router.push(`${pathname}?${params.toString()}`);
  };

  // 달램핏 카테고리인지 확인
  const isDallampitCategory =
    selectedType === 'DALLAEMFIT' ||
    selectedType === 'OFFICE_STRETCHING' ||
    selectedType === 'MINDFULNESS';

  return (
    <div className="flex flex-col gap-4">
      {/* 카테고리 탭 */}
      <Tab
        items={categoryItems}
        selectedId={isDallampitCategory ? 'DALLAEMFIT' : selectedType}
        onSelect={handleCategoryChange}
        className="gap-4"
      />

      {/* 활동 칩 (달램핏 카테고리일 때만 표시) */}
      {isDallampitCategory && (
        <div className="flex gap-2">
          {activityItems.map((item) => (
            <Chip
              key={item.value}
              active={selectedType === item.value}
              onClick={() => updateFilter('type', item.value)}
              className="cursor-pointer"
            >
              {item.label}
            </Chip>
          ))}
        </div>
      )}

      {/* 워케이션 활동 칩 */}
      {!isDallampitCategory && (
        <div className="flex gap-2">
          {workationActivityItems.map((item) => (
            <Chip
              key={item.value}
              active={selectedType === item.value}
              onClick={() => updateFilter('type', item.value)}
              className="cursor-pointer"
            >
              {item.label}
            </Chip>
          ))}
        </div>
      )}

      <div className="border-2 border-t border-gray-200"></div>

      {/* 지역 필터와 정렬 */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Filter
            options={regionOptions}
            selected={selectedLocation}
            onChange={(value) => updateFilter('location', value)}
            allValue="전체보기"
          />
        </div>
        <Sort
          options={sortOptions}
          selected={selectedSortBy}
          onChange={(value) => updateFilter('sortBy', value)}
        />
      </div>
    </div>
  );
};
