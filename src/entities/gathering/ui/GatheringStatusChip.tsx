// 'use client';
import { useTranslations } from 'next-intl';
import { StateChip } from '@/shared/ui/chip';

interface GatheringStatusChipProps {
  gatheringDateTime: Date;
  participantCount: number;
}

export const GatheringStatusChip = ({
  gatheringDateTime,
  participantCount,
}: GatheringStatusChipProps) => {
  const t = useTranslations('ui.gatheringCard.statusChip');

  const isUpcoming = new Date(gatheringDateTime) > new Date();
  const isConfirmed = participantCount >= 5;

  return (
    <div className="flex items-center gap-2">
      {isUpcoming && <StateChip variant="scheduled">{t('scheduled')}</StateChip>}
      {!isUpcoming && isConfirmed && <StateChip variant="completed">{t('completed')}</StateChip>}
      {!isConfirmed && <StateChip variant="pending">{t('pending')}</StateChip>}
      {isConfirmed && <StateChip variant="confirmed">{t('confirmed')}</StateChip>}
    </div>
  );
};
