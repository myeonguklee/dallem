export const FavoritesSkeletonCard = () => (
  <div className="rounded-common tablet:flex-row relative flex w-full animate-pulse flex-col gap-1 overflow-hidden p-2 shadow-sm">
    {/* 이미지 부분 */}
    <div className="tablet:w-[280px] relative w-full bg-gray-200">
      <div className="tablet:h-[160px] h-40 w-full"></div>
    </div>

    {/* 텍스트 부분 */}
    <div className="flex flex-1 flex-col justify-between gap-4 p-4">
      <div className="tablet:flex-row flex flex-col items-start justify-between gap-2">
        <div className="flex w-full flex-col gap-3">
          <div className="h-5 w-3/4 rounded bg-gray-200" />
          <div className="h-5 w-1/2 rounded bg-gray-200" />
        </div>
        <div className="h-8 w-8 rounded-full bg-gray-200"></div>
      </div>
      <div className="flex w-full items-end gap-2">
        <div className="flex flex-col">
          <div className="h-2 w-1/4 rounded bg-gray-200" />
          <div className="h-2 w-full rounded bg-gray-200" />
        </div>
        <div className="h-8 w-24 rounded bg-gray-200" />
      </div>
    </div>
  </div>
);
