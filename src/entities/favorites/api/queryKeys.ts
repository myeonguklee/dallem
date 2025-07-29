export const FAVORITES_QUERY_KEY = {
  favorites: {
    base: ['favorites'] as const,
    list: (filters: { type?: string; favoriteIds?: number[] }) =>
      [
        ...FAVORITES_QUERY_KEY.favorites.base,
        'list',
        { ...filters, favoriteIds: filters.favoriteIds?.join(',') }, // 객체로 감싸기
      ] as const,
  },
};

// // queryKeys.ts (핵심 수정)
// export const FAVORITES_QUERY_KEY = {
//   favorites: {
//     base: ['favorites'] as const,
//     list: (filters: { type?: string; locale?: string }) =>
//       [
//         ...FAVORITES_QUERY_KEY.favorites.base,
//         'list',
//         filters.locale || 'ko',
//         filters.type,
//       ] as const,
//   },
// };
