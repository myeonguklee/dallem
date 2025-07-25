import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { cn, formatDateToYYYYMMDD } from '@/shared/lib';
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
      {reviewImg && (
        <div className="tablet:w-72 tablet:h-auto relative h-[156px] w-full flex-shrink-0 overflow-hidden rounded-[var(--radius-common)] bg-gray-200">
          <Image
            src={reviewImg}
            alt={gatheringName ?? '모임 이미지'}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/*  내용 영역 */}
      <div className="tablet:mt-0 mt-6 flex flex-col space-y-2">
        {/*평점 + 코멘트 */}
        <div className="flex flex-col gap-2">
          <div className="space-y-2">
            <RatingStarDisplay score={score} />
          </div>
          <p className="overflow-hidden text-base font-medium text-gray-700">{comment}</p>
        </div>

        {/* 2-2. 모임 정보 + 메타 */}
        <div className="flex flex-col gap-2 text-xs text-gray-700">
          <div className="">
            {gatheringName && <span>{gatheringName} 이용</span>}
            {location && <span> | {location}</span>}
          </div>
          <div className="flex items-center gap-2">
            {userImg && (
              <div className="relative h-6 w-6 overflow-hidden rounded-full">
                <Image
                  src={userImg}
                  alt={userName ?? '유저 이미지'}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            {userName && <span>{userName}</span>}
            <span>|</span>
            <time>{displayDate}</time>
          </div>
        </div>
      </div>
    </article>
  );
};
