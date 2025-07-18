import { StateChip } from '@/shared/ui/chip';

interface GatheringStatusChipProps {
  gatheringDateTime: Date;
  participantCount: number;
}

export const GatheringStatusChip = ({
  gatheringDateTime,
  participantCount,
}: GatheringStatusChipProps) => {
  const isUpcoming = new Date(gatheringDateTime) > new Date();
  const isConfirmed = participantCount >= 5;

  return (
    <div className="flex items-center gap-2">
      {isUpcoming && <StateChip variant="scheduled">이용 예정</StateChip>}
      {!isUpcoming && isConfirmed && <StateChip variant="completed">이용 완료</StateChip>}
      {!isConfirmed && <StateChip variant="pending">개설대기</StateChip>}
      {isConfirmed && <StateChip variant="confirmed">개설확정</StateChip>}
    </div>
  );
};
