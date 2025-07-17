import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { cn } from '@/shared/lib';
import { RatingStarDisplay } from '@/shared/ui/ratingStarDisplay/RatingStarDisplay';

export interface ReviewCardProps {
  score: number;
  comment: string;
  dateTime: string;
  userName?: string;
  userImg?: string | StaticImageData;
  reviewImg?: string | StaticImageData;
  gatheringName?: string;
  location?: string;
}

export const ReviewCard = ({
  score,
  comment,
  dateTime,
  reviewImg,
  userName,
  userImg,
  gatheringName,
  location,
}: ReviewCardProps) => {
  const hasGatheringInfo = gatheringName || location;

  return (
    <article
      aria-label="사용자 리뷰"
      className={cn(
        'mb-6 flex flex-col justify-between gap-2 border-b border-gray-400 pb-6',
        'tablet:flex-row tablet:items-start tablet:gap-12',
      )}
    >
      <header className="flex flex-col">
        {/* 평점 */}
        <RatingStarDisplay score={score} />
        <div
          className={cn(
            'mt-2 flex items-center',
            'tablet:basis-1/3 tablet:flex-col tablet:items-start',
          )}
        >
          {/* 유저 이미지 + 이름 */}
          <div className="flex items-center gap-3">
            {userImg && (
              <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full bg-gray-300">
                <Image
                  src={userImg}
                  alt="유저이미지"
                  fill
                  className="object-cover"
                />
              </div>
            )}
            {userName && <span className="mr-4 text-sm leading-6 font-medium">{userName}</span>}
          </div>

          {/* 날짜 */}
          <time className={cn('text-xs text-gray-600', 'tablet:mt-1')}>{dateTime}</time>
        </div>
      </header>

      <main
        className={cn('mt-2 flex flex-col space-y-1', 'tablet:basis-2/3 tablet:mt-0 tablet:flex-1')}
      >
        {/* 모임 이름 + 지역 */}
        {hasGatheringInfo && (
          <div className="flex items-center gap-2">
            {gatheringName && <strong>{gatheringName}</strong>}
            {location && <span className="text-sm text-gray-600">| {location}</span>}
          </div>
        )}

        {/* 코멘트 */}
        <p className="text-var[(--color-font-secondary)] text-sm leading-6">{comment}</p>

        {/* 모임 이미지 */}
        {reviewImg && (
          <div className="relative mt-2 h-32 w-32 overflow-hidden rounded-[var(--radius-common)] bg-gray-300">
            <Image
              src={reviewImg}
              alt="모임 이미지"
              fill
              className="object-cover"
            />
          </div>
        )}
      </main>
    </article>
  );
};
