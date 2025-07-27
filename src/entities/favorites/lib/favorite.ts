import { getGatherings } from '@/entities/gathering/api';
import { parseGatheringFiltersFromSearchParams } from '@/entities/gathering/model/filters';
import { Gathering } from '@/entities/gathering/model/types';

interface FetchFavoritesDataProps {
  ids: number[];
  type: string;
  pageParam: number;
}

const LIMIT = 10;
export const fetchFavoritesData = async ({ ids, type, pageParam = 0 }: FetchFavoritesDataProps) => {
  if (ids.length === 0) {
    return { items: [], nextOffset: undefined }; // 빈 배열과 다음 페이지 없음을 반환
  }

  const favoriteIds = ids.join(',');
  const filters = parseGatheringFiltersFromSearchParams({ id: favoriteIds, type });
  const data: Gathering[] = await getGatherings({ ...filters, limit: LIMIT, offset: pageParam });
  const hasNextPage = data.length === LIMIT;
  const nextOffset = hasNextPage ? pageParam + data.length : undefined;
  return {
    items: data,
    nextOffset,
  };
};
