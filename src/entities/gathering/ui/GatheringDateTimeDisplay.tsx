import { useFormatter } from 'next-intl';
import { InfoChip } from '@/shared/ui/chip';

interface GatheringDateTimeDisplayProps {
  dateTime: Date;
}

export const GatheringDateTimeDisplay = ({ dateTime }: GatheringDateTimeDisplayProps) => {
  const format = useFormatter();

  const formattedDate = format.dateTime(dateTime, {
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = format.dateTime(dateTime, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

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
