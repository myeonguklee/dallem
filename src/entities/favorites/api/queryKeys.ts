export const FAVORITES_QUERY_KEY = {
  favorites: {
    base: ['favorites'] as const,
    list: (type?: string, favoriteIds?: number[]) =>
      [...FAVORITES_QUERY_KEY.favorites.base, 'list', type, favoriteIds] as const,
  },
};
