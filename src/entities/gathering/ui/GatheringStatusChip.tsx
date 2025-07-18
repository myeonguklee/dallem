import { StateChip } from '@/shared/ui/chip';
import { calculateGatheringStatus } from '../model/gatheringStatus';

interface GatheringStatusChipProps {
  gatheringDateTime: Date;
  participantCount: number;
}

export const GatheringStatusChip = ({
  gatheringDateTime,
  participantCount,
}: GatheringStatusChipProps) => {
  const { isUpcoming } = calculateGatheringStatus(gatheringDateTime);
  const isConfirmed = participantCount >= 5;

  return (
    <div className="flex items-center gap-2">
      {isUpcoming ? (
        <StateChip variant="scheduled">이용 예정</StateChip>
      ) : (
        <StateChip variant="completed">이용 완료</StateChip>
      )}
      {isConfirmed && <StateChip variant="confirmed">개설확정</StateChip>}
    </div>
  );
};
