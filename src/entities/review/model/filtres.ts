import { ReviewFilterProps } from './type';

export const parseReviewFilters = (
  filterQuery: Record<string, string | string[] | undefined>,
): ReviewFilterProps => {
  return {
    type:
      typeof filterQuery.type === 'string'
        ? (filterQuery.type as ReviewFilterProps['type'])
        : undefined,
    location:
      typeof filterQuery.location === 'string'
        ? (filterQuery.location as ReviewFilterProps['location'])
        : undefined,
    date: typeof filterQuery.date === 'string' ? filterQuery.date : undefined,
    sortBy:
      typeof filterQuery.sortBy === 'string'
        ? (filterQuery.sortBy as ReviewFilterProps['sortBy'])
        : 'createdAt',
    sortOrder:
      typeof filterQuery.sortOrder === 'string'
        ? (filterQuery.sortOrder as ReviewFilterProps['sortOrder'])
        : 'desc',
    limit: 10,
    offset: 0,
  };
};
