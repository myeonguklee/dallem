'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { GatheringDateTimeDisplay, GatheringStatusChip } from '@/entities/gathering/ui';
import { MyPageActionButton } from '@/features/my-page/ui';
import { Link } from '@/i18n';
import { ROUTES } from '@/shared/config/routes';
import { PersonIcon } from '@/shared/ui/icon';

interface MyPageGatheringCardProps {
  gatheringId: number;
  gatheringType: string;
  gatheringName: string;
  gatheringLocation: string;
  gatheringDateTime: Date;
  gatheringParticipantCount: number;
  gatheringCapacity: number;
  gatheringImage: string;
  isCanceled: boolean;
  joinedAt?: Date;
  isCompleted?: boolean;
  isReviewed?: boolean;
  isActionButtonVisible?: boolean;
}

export const MyPageGatheringCard = ({
  gatheringId,
  gatheringType,
  gatheringName,
  gatheringLocation,
  gatheringDateTime,
  gatheringParticipantCount,
  gatheringCapacity,
  gatheringImage,
  isCanceled,
  isCompleted,
  isReviewed,
  isActionButtonVisible = true,
}: MyPageGatheringCardProps) => {
  const t = useTranslations('ui.gatheringCard');
  const locale = useLocale();

  return (
    <div className="rounded-common tablet:flex-row relative flex w-full flex-col gap-1 overflow-hidden border border-gray-200 bg-white">
      {/* eslint-disable @typescript-eslint/no-explicit-any */}
      <Link
        href={ROUTES.GATHERING_DETAIL(gatheringId) as any}
        locale={locale}
      >
        <div className="tablet:w-[280px] relative w-full">
          <Image
            src={gatheringImage || '/gathering-default-image.png'}
            width={400}
            height={224}
            alt={`${gatheringName} 이미지`}
            className="tablet:h-[160px] h-40 w-full object-cover"
            sizes="(max-width: 744px) 100vw, 280px"
            priority
          />
        </div>
      </Link>

      <div className="flex-1">
        <div className="flex flex-col justify-between gap-4 p-2">
          <Link
            href={ROUTES.GATHERING_DETAIL(gatheringId) as any}
            locale={locale}
          >
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                {/* 상태 칩들 */}
                <GatheringStatusChip
                  gatheringDateTime={gatheringDateTime}
                  participantCount={gatheringParticipantCount}
                />

                {/* 모임 타입과 장소 */}
                <div className="flex items-center gap-1">
                  <h3 className="text-base font-semibold text-black">{gatheringName}</h3>
                  <span>|</span>
                  <span className="text-sm font-medium text-gray-700">{gatheringLocation}</span>
                  <span>|</span>
                  <span className="text-sm font-medium text-gray-700">{gatheringType}</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* 모임 날짜 시간 정보 */}
                  <GatheringDateTimeDisplay dateTime={gatheringDateTime} />

                  {/* 참여자 수 */}
                  <div className="flex items-center gap-2">
                    <PersonIcon />
                    <span className="text-sm text-black">
                      {gatheringParticipantCount}/{gatheringCapacity}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <div className="flex w-full">
            {/* 액션 버튼 */}
            {!isCanceled && isActionButtonVisible && (
              <MyPageActionButton
                gatheringId={gatheringId}
                isCompleted={isCompleted}
                isReviewed={isReviewed}
              />
            )}
          </div>
        </div>
      </div>

      {/* 취소된 모임 오버레이 */}
      {isCanceled && (
        <div className="rounded-common absolute inset-0 flex items-center justify-center bg-black opacity-80">
          <div className="flex flex-col items-center gap-2 text-center text-white">
            <div className="text-lg font-medium">{t('canceled')}</div>
          </div>
        </div>
      )}
    </div>
  );
};
