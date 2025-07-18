import Image from 'next/image';
import { GatheringDateTimeDisplay, GatheringStatusChip } from '@/entities/gathering/ui';
import { MyPageActionButton } from '@/features/gathering/ui';
import { PersonIcon } from '@/shared/ui/icon';

interface MyPageGatheringCardProps {
  gatheringId: number;
  gatheringName: string;
  gatheringLocation: string;
  gatheringDateTime: Date;
  gatheringParticipantCount: number;
  gatheringCapacity: number;
  gatheringImage: string;
  isCanceled: boolean;
}

export const MyPageGatheringCard = ({
  gatheringId,
  gatheringName,
  gatheringLocation,
  gatheringDateTime,
  gatheringParticipantCount,
  gatheringCapacity,
  gatheringImage,
  isCanceled,
}: MyPageGatheringCardProps) => {
  return (
    <div className="rounded-common tablet:flex-row relative flex w-full max-w-[996px] flex-col gap-4">
      <div className="rounded-common tablet:w-[280px] relative w-full overflow-hidden">
        <Image
          src={
            gatheringImage ||
            'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=224&fit=crop&crop=center&q=80'
          }
          width={400}
          height={224}
          alt={`${gatheringName} 이미지`}
          className="tablet:h-full h-40 w-full object-cover"
          sizes="(max-width: 744px) 100vw, 280px"
          priority
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            {/* 상태 칩들 */}
            <GatheringStatusChip
              gatheringDateTime={gatheringDateTime}
              participantCount={gatheringParticipantCount}
            />

            {/* 모임 타입과 장소 */}
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-black">{gatheringName}</h3>
              <span>|</span>
              <span className="text-sm font-medium text-gray-700">{gatheringLocation}</span>
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

        <div className="flex w-full items-end">
          {/* 액션 버튼 */}
          {!isCanceled && (
            <MyPageActionButton
              gatheringId={gatheringId}
              gatheringDateTime={gatheringDateTime}
            />
          )}
        </div>
      </div>

      {/* 취소된 모임 오버레이 */}
      {isCanceled && (
        <div className="rounded-common absolute inset-0 flex items-center justify-center bg-black opacity-80">
          <div className="flex flex-col items-center gap-2 text-center text-white">
            <div className="text-lg font-medium">모집 취소된 모임이에요, 다음 기회에 만나요 🙏</div>
          </div>
        </div>
      )}
    </div>
  );
};
