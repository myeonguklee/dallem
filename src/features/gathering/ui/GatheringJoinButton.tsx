import { useTranslations } from 'next-intl';
import { Button } from '@/shared/ui/button/Button';

interface GatheringJoinButtonProps {
  gatheringId: number;
  participantCount: number;
  capacity: number;
}

export const GatheringJoinButton = ({
  gatheringId,
  participantCount,
  capacity,
}: GatheringJoinButtonProps) => {
  const t = useTranslations('ui.gatheringCard.joinButton');

  // const [isJoining, setIsJoining] = useState(false);

  // userId 가져오기

  // gatherings/joined 데이터 중 gatheringId가 있는지 확인
  // gatheringId 있으면 IsJoining true
  // 없으면 IsJoining false
  console.log('gatheringId', gatheringId);
  // 낙관적 업데이트 활용
  // 참석, 취소 확인 모달 ?

  // const handleJoin = () => {
  //   setIsJoining(!isJoining);
  // };

  // 모집이 마감되었는지 확인
  const isFull = participantCount >= capacity;

  // 버튼 텍스트 결정
  const getButtonText = () => {
    if (isFull) return t('full');
    // if (isJoining) return t('cancel');
    return t('join');
  };

  // 버튼 variant 결정
  const getButtonVariant = () => {
    if (isFull) return 'default';
    // if (isJoining) return 'outline';
    return 'primary';
  };

  return (
    <Button
      className="h-8 w-24 px-4 py-2 text-sm whitespace-nowrap"
      variant={getButtonVariant()}
      disabled={isFull}
      // onClick={handleJoin}
    >
      {getButtonText()}
    </Button>
  );
};
