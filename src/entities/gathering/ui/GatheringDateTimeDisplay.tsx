import { InfoChip } from '@/shared/ui/chip';

interface GatheringDateTimeDisplayProps {
  dateTime: Date;
}

export const GatheringDateTimeDisplay = ({ dateTime }: GatheringDateTimeDisplayProps) => {
  const formatDate = (date: Date): string => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}월 ${day}일`;
  };

  const formatTime = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const formattedDate = formatDate(dateTime);
  const formattedTime = formatTime(dateTime);

  return (
    <div className="flex gap-2">
      <InfoChip
        info={formattedDate}
        className="h-6 px-2 py-2"
      />
      <InfoChip
        info={formattedTime}
        variant="time"
        className="h-6 px-2 py-2"
      />
    </div>
  );
};
