import Image from 'next/image';
import { GatheringDateTimeDisplay } from '@/entities/gathering/ui/GatheringDateTimeDisplay';
import { GatheringDeadlineTag } from '@/entities/gathering/ui/GatheringDeadlineTag';
import { GatheringJoinButton } from '@/entities/gathering/ui/GatheringJoinButton';
import { GatheringLikeButton } from '@/entities/gathering/ui/GatheringLikeButton';
import { StateChip } from '@/shared/ui/chip';
import { ProgressBar } from '@/shared/ui/progressbar';

interface GatheringCardProps {
  gatheringId: number;
  gatheringType: string;
  gatheringName: string;
  gatheringLocation: string;
  gatheringDateTime: Date;
  gatheringRegistraionEnd: Date;
  gatheringParticipantCount: number;
  gatheringCapacity: number;
  gatheringImage: string;
}

const participantCountToConfirm = 5;

export const GatheringCard = ({
  gatheringId,
  gatheringName,
  gatheringLocation,
  gatheringDateTime,
  gatheringRegistraionEnd,
  gatheringParticipantCount,
  gatheringCapacity,
  gatheringImage,
}: GatheringCardProps) => {
  // 모임 참여자 수가 5명 이상이면 개설확정 칩 표시
  const isConfirmed = gatheringParticipantCount >= participantCountToConfirm;

  return (
    <div className="tablet:flex-row rounded-common flex w-full max-w-[996px] flex-col overflow-hidden border border-gray-200 bg-white">
      <div className="tablet:w-[280px] relative w-full">
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
        {/* 모집 마감 시간 */}
        <GatheringDeadlineTag registrationEnd={gatheringRegistraionEnd} />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4 p-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            {/* 모임 이름, 장소 */}
            <h3 className="font-semibold text-black">
              {gatheringName} | {gatheringLocation}
            </h3>
            {/* 모임 날짜 시간 정보 */}
            <GatheringDateTimeDisplay dateTime={gatheringDateTime} />
          </div>
          {/* 좋아요 버튼 */}
          <GatheringLikeButton gatheringId={gatheringId} />
        </div>

        <div className="flex w-full items-end gap-2">
          <div className="flex w-full flex-col gap-2">
            {/* 프로그래스 바,  참여자 수 */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-black">
                {gatheringParticipantCount}/{gatheringCapacity}
              </span>
              {isConfirmed && <StateChip variant="confirmed">개설확정</StateChip>}
            </div>
            <ProgressBar
              current={gatheringParticipantCount}
              total={gatheringCapacity}
              minToConfirm={participantCountToConfirm}
            />
          </div>

          <GatheringJoinButton
            gatheringId={gatheringId}
            participantCount={gatheringParticipantCount}
            capacity={gatheringCapacity}
          />
        </div>
      </div>
    </div>
  );
};
