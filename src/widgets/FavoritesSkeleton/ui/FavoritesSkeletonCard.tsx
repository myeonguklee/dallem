export const FavoritesSkeletonCard = () => (
  <div className="flex w-full animate-pulse gap-4 rounded-xl bg-gray-100 p-2 shadow-sm">
    {/* 이미지 부분 */}
    <div className="h-40 w-40 flex-shrink-0 rounded-lg bg-gray-300" />

    {/* 텍스트 부분 */}
    <div className="flex flex-1 flex-col justify-between space-y-2">
      <div className="h-10 w-3/4 rounded bg-gray-300" />
      <div className="h-10 w-1/2 rounded bg-gray-300" />
      <div className="h-10 w-2/3 rounded bg-gray-300" />
    </div>
  </div>
);
