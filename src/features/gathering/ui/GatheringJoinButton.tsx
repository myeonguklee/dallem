import { useTranslations } from 'next-intl';
import { Button } from '@/shared/ui/button/Button';

interface GatheringJoinButtonProps {
  participantCount: number;
  capacity: number;
}

export const GatheringJoinButton = ({ participantCount, capacity }: GatheringJoinButtonProps) => {
  const t = useTranslations('ui.gatheringCard.joinButton');

  // TODO: 모임 참가 여부에 따른 버튼 확장

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
      className="h-8 w-24 px-4 py-2 text-sm whitespace-nowrap"
      variant={getButtonVariant()}
      disabled={isFull}
    >
      {getButtonText()}
    </Button>
  );
};
