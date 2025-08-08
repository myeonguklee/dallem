import { Skeleton } from '@/shared/ui/skeleton';

export const GatheringDetailSkeleton = () => {
  return (
    <div
      className="tablet:mb-[100px] mb-[200px] flex w-[996px] flex-col px-4 py-8"
      role="status"
      aria-label="모임 상세 정보 로딩 중"
    >
      {/* 2. 상단 섹션 (배너 + 정보) */}
      <section
        className="mx-auto mb-8 flex w-full max-w-[996px] flex-col gap-4 md:flex-row"
        data-testid="top-section"
      >
        {/* Gathering Banner Skeleton */}
        <div className="h-[270px] w-full rounded-xl md:h-auto md:min-w-0 md:flex-1">
          <Skeleton className="h-full w-full" />
        </div>

        {/* ContainerInformation Skeleton */}
        <div
          className="flex h-full w-full flex-col rounded-xl border border-gray-300 bg-gray-50 p-6 md:w-[360px] md:flex-shrink-0"
          data-testid="info-section"
        >
          {/* 제목 */}
          <Skeleton className="h-7 w-4/5" />
          <div className="my-4 border-t border-gray-200" />
          {/* 정보 목록 (날짜, 시간, 장소) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 shrink-0" />
              <Skeleton className="h-5 w-1/2" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 shrink-0" />
              <Skeleton className="h-5 w-3/5" />
            </div>
          </div>
          <div className="my-4 border-t border-gray-200" />
          {/* 참여 인원 */}
          <div>
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="mt-2 h-3 w-full rounded-full" />
            <div className="mt-2 flex justify-between">
              <Skeleton className="h-3 w-1/4" />
              <Skeleton className="h-3 w-1/4" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. 리뷰 리스트 섹션 */}
      <section
        className="mx-auto min-h-[200px] w-full max-w-[996px] border-t-2 border-gray-300 p-4"
        data-testid="review-section"
      >
        {/* 리뷰 제목 */}
        <Skeleton
          className="mb-6 h-6 w-24"
          data-testid="review-title-skeleton"
        />
        {/* 리뷰 카드 리스트 */}
        <div className="space-y-6">
          {/* 리뷰 카드 스켈레톤 */}
          <div
            className="flex items-start gap-4"
            data-testid="review-card-skeleton"
          >
            <Skeleton className="h-12 w-12 shrink-0 rounded-full" />
            <div className="w-full space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
          <div
            className="flex items-start gap-4"
            data-testid="review-card-skeleton"
          >
            <Skeleton className="h-12 w-12 shrink-0 rounded-full" />
            <div className="w-full space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
