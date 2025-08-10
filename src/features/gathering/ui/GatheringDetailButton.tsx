import { useTranslations } from 'next-intl';
import { Button } from '@/shared/ui/button/Button';

interface GatheringDetailButtonProps {
  participantCount: number;
  capacity: number;
}

export const GatheringDetailButton = ({
  participantCount,
  capacity,
}: GatheringDetailButtonProps) => {
  const t = useTranslations('ui.gatheringCard.joinButton');

  // 모집이 마감되었는지 확인
  const isFull = participantCount >= capacity;

  // 버튼 텍스트 결정
  const getButtonText = () => {
    if (isFull) return t('full');
    return t('detail');
  };

  // 버튼 variant 결정
  const getButtonVariant = () => {
    if (isFull) return 'default';
    return 'primary';
  };

  return (
    <Button
      className="h-8 w-24 px-4 py-2 text-sm font-bold whitespace-nowrap"
      variant={getButtonVariant()}
      disabled={isFull}
    >
      {getButtonText()}
    </Button>
  );
};
