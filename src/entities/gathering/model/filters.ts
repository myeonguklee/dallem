import { GatheringFilters } from './types';

export function parseGatheringFiltersFromSearchParams(searchParams: {
  [key: string]: string | string[] | undefined;
}): GatheringFilters {
  const filters: GatheringFilters = {};

  if (typeof searchParams.id === 'string') filters.id = searchParams.id;

  // type이 없으면 기본값으로 DALLAEMFIT 설정
  // 중복 api 호출 방지
  if (typeof searchParams.type === 'string') {
    filters.type = searchParams.type as GatheringFilters['type'];
  } else {
    filters.type = 'DALLAEMFIT'; // 기본값
  }

  if (typeof searchParams.location === 'string')
    filters.location = searchParams.location as GatheringFilters['location'];
  if (typeof searchParams.date === 'string') filters.date = searchParams.date;
  if (typeof searchParams.createdBy === 'string')
    filters.createdBy = Number(searchParams.createdBy);
  if (typeof searchParams.sortBy === 'string')
    filters.sortBy = searchParams.sortBy as GatheringFilters['sortBy'];
  if (typeof searchParams.sortOrder === 'string')
    filters.sortOrder = searchParams.sortOrder as GatheringFilters['sortOrder'];

  return filters;
}
