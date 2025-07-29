export const FAVORITES_QUERY_KEY = {
  favorites: {
    base: ['favorites'] as const,
    list: (filters: { type?: string; favoriteIds?: number[] }) =>
      [
        ...FAVORITES_QUERY_KEY.favorites.base,
        'list',
        { ...filters, favoriteIds: filters.favoriteIds?.join(',') },
      ] as const,
  },
};
