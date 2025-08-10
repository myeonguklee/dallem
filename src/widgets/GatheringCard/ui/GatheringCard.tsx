import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { GatheringDateTimeDisplay, GatheringDeadlineTag } from '@/entities/gathering/ui';
import { GatheringDetailButton, GatheringLikeButton } from '@/features/gathering/ui';
import { Link } from '@/i18n';
import { ROUTES } from '@/shared/config/routes';
import { StateChip } from '@/shared/ui/chip';
import { PersonIcon } from '@/shared/ui/icon';
import { ProgressBar } from '@/shared/ui/progressbar';

interface GatheringCardProps {
  gatheringId: number;
  gatheringType: string;
  gatheringName: string;
  gatheringLocation: string;
  gatheringDateTime: Date;
  gatheringRegistrationEnd: Date;
  gatheringParticipantCount: number;
  gatheringCapacity: number;
  gatheringImage: string;
  isCanceled: boolean;
  isEnded: boolean;
  isFirstCard?: boolean;
  onToggle?: () => void;
}

const participantCountToConfirm = 5;

export const GatheringCard = ({
  gatheringId,
  gatheringType,
  gatheringName,
  gatheringLocation,
  gatheringDateTime,
  gatheringRegistrationEnd,
  gatheringParticipantCount,
  gatheringCapacity,
  gatheringImage,
  isCanceled,
  isEnded,
  isFirstCard = false,
  onToggle,
}: GatheringCardProps) => {
  const t = useTranslations('ui.gatheringCard');
  // 모임 참여자 수가 5명 이상이면 개설확정 칩 표시
  const isConfirmed = gatheringParticipantCount >= participantCountToConfirm;

  return (
    <div className="tablet:flex-row rounded-common relative flex w-full flex-col overflow-hidden border border-gray-200 bg-white">
      {/* eslint-disable @typescript-eslint/no-explicit-any */}
      <Link href={ROUTES.GATHERING_DETAIL(gatheringId) as any}>
        <div className="tablet:w-[280px] relative w-full">
          <Image
            src={gatheringImage || '/gathering-default-image.png'}
            width={280}
            height={160}
            alt={`${gatheringName} 이미지`}
            className="tablet:h-[160px] h-40 w-full object-cover"
            sizes="(max-width: 744px) 100vw, (max-width: 1024px) 50vw, 280px"
            priority={isFirstCard}
            fetchPriority={isFirstCard ? 'high' : 'auto'}
            quality={isFirstCard ? 90 : 75}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
          {/* 모집 마감 시간 */}
          <GatheringDeadlineTag registrationEnd={gatheringRegistrationEnd} />
        </div>
      </Link>

      <div className="flex flex-1 flex-col justify-between gap-4 p-4">
        <div className="flex items-start justify-between">
          <Link href={ROUTES.GATHERING_DETAIL(gatheringId) as any}>
            <div className="flex flex-col gap-2">
              {/* 모임 타입, 장소 */}
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-black">{gatheringName}</h3>
                <span>|</span>
                <span className="text-sm font-medium text-gray-700">{gatheringLocation}</span>
                <span>|</span>
                <span className="text-sm font-medium text-gray-700">{gatheringType}</span>
              </div>
              {/* 모임 날짜 시간 정보 */}
              <GatheringDateTimeDisplay dateTime={gatheringDateTime} />
            </div>
          </Link>

          {/* 좋아요 버튼 */}
          <GatheringLikeButton
            gatheringId={gatheringId}
            onToggle={onToggle}
          />
        </div>

        <Link href={ROUTES.GATHERING_DETAIL(gatheringId) as any}>
          <div className="flex w-full items-end gap-2">
            <div className="flex w-full flex-col gap-2">
              {/* 프로그래스 바,  참여자 수 */}
              <div className="flex items-center gap-2">
                <PersonIcon />
                <span className="text-sm text-black">
                  {gatheringParticipantCount}/{gatheringCapacity}
                </span>
                {isConfirmed && <StateChip variant="confirmed">{t('status.confirmed')}</StateChip>}
              </div>
              <ProgressBar
                current={gatheringParticipantCount}
                total={gatheringCapacity}
                minToConfirm={participantCountToConfirm}
              />
            </div>

            <GatheringDetailButton
              participantCount={gatheringParticipantCount}
              capacity={gatheringCapacity}
            />
          </div>
        </Link>
      </div>

      {/* 취소된 모임 오버레이 */}
      {isCanceled && (
        <div className="rounded-common absolute inset-0 flex items-center justify-center bg-black opacity-80">
          <div className="flex flex-col items-center gap-2 text-white">
            <div className="text-lg font-medium">{t('canceled')}</div>
          </div>
        </div>
      )}

      {/* 모임이 종료된 경우 */}
      {isEnded && (
        <Link href={ROUTES.GATHERING_DETAIL(gatheringId) as any}>
          <div className="rounded-common absolute inset-0 flex items-center justify-center bg-black opacity-60">
            <div className="flex flex-col items-center gap-2">
              <div className="text-lg font-medium text-white">{t('ended')}</div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};
