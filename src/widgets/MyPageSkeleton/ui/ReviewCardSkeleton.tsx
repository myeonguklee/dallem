export const ReviewCardSkeleton = () => (
  <div className="flex animate-pulse flex-col gap-4">
    {/* 리뷰 카드 */}
    <div className="rounded-common flex w-full max-w-[996px] flex-col gap-4 border border-gray-100 p-4">
      {/* 헤더 영역 */}
      <div className="flex items-center gap-3">
        {/* 사용자 아바타 */}
        <div className="h-10 w-10 rounded-full bg-gray-200"></div>

        {/* 사용자 정보 */}
        <div className="flex flex-col gap-1">
          <div className="h-4 w-24 rounded bg-gray-200"></div>
          <div className="h-3 w-16 rounded bg-gray-200"></div>
        </div>

        {/* 별점 */}
        <div className="ml-auto flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-4 w-4 rounded bg-gray-200"
            ></div>
          ))}
        </div>
      </div>

      {/* 리뷰 내용 */}
      <div className="flex flex-col gap-2">
        <div className="h-4 w-full rounded bg-gray-200"></div>
        <div className="h-4 w-3/4 rounded bg-gray-200"></div>
      </div>

      {/* 모임 정보 */}
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded bg-gray-200"></div>
        <div className="flex flex-col gap-1">
          <div className="h-4 w-32 rounded bg-gray-200"></div>
          <div className="h-3 w-24 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>

    <div className="rounded-common flex w-full max-w-[996px] flex-col gap-4 border border-gray-100 p-4">
      {/* 헤더 영역 */}
      <div className="flex items-center gap-3">
        {/* 사용자 아바타 */}
        <div className="h-10 w-10 rounded-full bg-gray-200"></div>

        {/* 사용자 정보 */}
        <div className="flex flex-col gap-1">
          <div className="h-4 w-24 rounded bg-gray-200"></div>
          <div className="h-3 w-16 rounded bg-gray-200"></div>
        </div>

        {/* 별점 */}
        <div className="ml-auto flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-4 w-4 rounded bg-gray-200"
            ></div>
          ))}
        </div>
      </div>

      {/* 리뷰 내용 */}
      <div className="flex flex-col gap-2">
        <div className="h-4 w-full rounded bg-gray-200"></div>
        <div className="h-4 w-3/4 rounded bg-gray-200"></div>
      </div>

      {/* 모임 정보 */}
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded bg-gray-200"></div>
        <div className="flex flex-col gap-1">
          <div className="h-4 w-32 rounded bg-gray-200"></div>
          <div className="h-3 w-24 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  </div>
);
