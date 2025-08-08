import { ReviewFilterParams } from './type';

export const parseReviewFilters = (
  filterQuery: Record<string, string | string[] | undefined>,
): ReviewFilterParams => {
  return {
    type:
      typeof filterQuery.type === 'string'
        ? (filterQuery.type as ReviewFilterParams['type'])
        : undefined,
    location:
      typeof filterQuery.location === 'string'
        ? (filterQuery.location as ReviewFilterParams['location'])
        : undefined,
    date: typeof filterQuery.date === 'string' ? filterQuery.date : undefined,
    sortBy:
      typeof filterQuery.sortBy === 'string'
        ? (filterQuery.sortBy as ReviewFilterParams['sortBy'])
        : 'createdAt',
    sortOrder:
      typeof filterQuery.sortOrder === 'string'
        ? (filterQuery.sortOrder as ReviewFilterParams['sortOrder'])
        : 'desc',
    limit: 10,
    offset: 0,
  };
};
