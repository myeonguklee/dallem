export const ReviewsSkeleton = () => (
  <div className="flex animate-pulse flex-col gap-4">
    {/* 탭 영역 */}
    <div className="flex gap-2">
      <div className="h-8 w-24 rounded bg-gray-200"></div>
      <div className="h-8 w-20 rounded bg-gray-200"></div>
    </div>

    {/* 리뷰 카드들 */}
    <div className="rounded-common tablet:flex-row relative flex w-full max-w-[996px] flex-col gap-4">
      {/* 이미지 영역 */}
      <div className="rounded-common tablet:w-[280px] relative w-full overflow-hidden">
        <div className="tablet:h-full h-40 w-full bg-gray-200"></div>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="flex flex-1 flex-col justify-between gap-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            {/* 상태 칩 */}
            <div className="h-6 w-20 rounded bg-gray-200"></div>

            {/* 제목과 장소 */}
            <div className="flex items-center gap-2">
              <div className="h-5 w-32 rounded bg-gray-200"></div>
              <div className="h-4 w-4 rounded bg-gray-200"></div>
              <div className="h-4 w-24 rounded bg-gray-200"></div>
            </div>

            {/* 날짜와 참여자 수 */}
            <div className="flex items-center gap-2">
              <div className="h-4 w-24 rounded bg-gray-200"></div>
              <div className="h-4 w-16 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex w-full items-end">
          <div className="h-8 w-20 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>

    <div className="rounded-common tablet:flex-row relative flex w-full max-w-[996px] flex-col gap-4">
      {/* 이미지 영역 */}
      <div className="rounded-common tablet:w-[280px] relative w-full overflow-hidden">
        <div className="tablet:h-full h-40 w-full bg-gray-200"></div>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="flex flex-1 flex-col justify-between gap-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            {/* 상태 칩 */}
            <div className="h-6 w-20 rounded bg-gray-200"></div>

            {/* 제목과 장소 */}
            <div className="flex items-center gap-2">
              <div className="h-5 w-32 rounded bg-gray-200"></div>
              <div className="h-4 w-4 rounded bg-gray-200"></div>
              <div className="h-4 w-24 rounded bg-gray-200"></div>
            </div>

            {/* 날짜와 참여자 수 */}
            <div className="flex items-center gap-2">
              <div className="h-4 w-24 rounded bg-gray-200"></div>
              <div className="h-4 w-16 rounded bg-gray-200"></div>
            </div>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex w-full items-end">
          <div className="h-8 w-20 rounded bg-gray-200"></div>
        </div>
      </div>
    </div>
  </div>
);
