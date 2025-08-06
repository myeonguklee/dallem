import React from 'react';
import type { StaticImageData } from 'next/image';
import { cn } from '@/shared/lib';
import { formatDateToYYYYMMDD } from '@/shared/lib/date';
import { OptimizedImage } from '@/shared/ui/OptimizedImage/OptimizedImage';
import { RatingStarDisplay } from '@/shared/ui/ratingStarDisplay/RatingStarDisplay';

export interface ReviewCardProps {
  score: number; // 숫자 범위 제한에 대한 zod / prop-types 에 대한 건의
  comment: string;
  dateTime: string;
  userName?: string;
  userImg?: string | StaticImageData;
  reviewImg?: string | StaticImageData;
  gatheringName?: string;
  location?: string;
  idx?: number;
}

export const ReviewCard = React.memo(function ReviewCardMemo({
  score,
  comment,
  dateTime,
  reviewImg,
  userName,
  userImg,
  gatheringName,
  location,
  idx,
}: ReviewCardProps) {
  const displayDate = formatDateToYYYYMMDD(dateTime);

  return (
    <article
      data-testid="review-card"
      aria-label={userName ?? '사용자 리뷰'}
      className={cn(
        'flex max-w-[1200px] flex-col border-b-2 border-dashed border-gray-200 pb-8',
        'tablet:flex-row tablet:items-stretch tablet:gap-6',
      )}
    >
      {/*  이미지 영역 */}

      {reviewImg !== undefined && (
        <div
          aria-label="모임이미지"
          className="tablet:w-[280px] relative aspect-[16/9] w-full overflow-hidden rounded-[var(--radius-common)] bg-gray-200"
        >
          <OptimizedImage
            src={reviewImg || '/gathering-default-image.png'}
            alt={gatheringName ?? '모임 이미지'}
            index={idx}
          />
        </div>
      )}

      {/*  내용 영역 */}
      <div className="tablet:mt-0 mt-6 flex flex-col space-y-2">
        {/*평점 + 코멘트 */}
        <div className="flex flex-col gap-2">
          <div
            className="space-y-2"
            aria-label="평점"
          >
            <RatingStarDisplay score={score} />
          </div>
          <p
            className="overflow-hidden text-base font-medium text-gray-700"
            aria-label="후기"
          >
            {comment}
          </p>
        </div>

        {/* 2-2. 모임 정보 + 메타 */}
        <div className="flex flex-col gap-2 text-xs text-gray-700">
          <div className="">
            {gatheringName && <span aria-label="모임이름">{gatheringName} 이용</span>}
            {location && <span aria-label="지역"> | {location}</span>}
          </div>
          <div className="flex items-center gap-2">
            {userImg && (
              <div
                aria-label="프로필 이미지"
                className="relative h-6 w-6 overflow-hidden rounded-full"
              >
                <OptimizedImage
                  src={userImg}
                  alt={userName ?? '유저 이미지'}
                  index={idx}
                />
              </div>
            )}
            {userName && <span aria-label="유저이름">{userName}</span>}
            <span>|</span>
            <time aria-label="모임시간">{displayDate}</time>
          </div>
        </div>
      </div>
    </article>
  );
});
