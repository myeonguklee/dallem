import { Participant } from '@/entities/participant/model/types';
import { GatheringRole } from '@/widgets/BottomFloatingBar';
import { GatheringDetail } from './types';

export const useGatheringRole = (gathering: GatheringDetail, participantsData: Participant[]) => {
  // const { data: user } = useUser();

  const user = { id: 1 }; // 임시로 사용자 ID를 1로 설정 (실제 구현에서는 useUser 같은 훅 사용)

  // 필요한 데이터가 아직 로드되지 않았을 경우 기본값(GUEST) 반환
  if (!user || !gathering || !participantsData) {
    return GatheringRole.GUEST;
  }

  const currentUserId = user.id;

  // 1. 호스트인지 확인
  if (gathering.createdBy === currentUserId) {
    return GatheringRole.HOST;
  }

  // 2. 멤버인지 확인
  const isParticipant = participantsData.some(
    (participant) => participant.userId === currentUserId,
  );
  if (isParticipant) {
    return GatheringRole.MEMBER;
  }

  // 3. 둘 다 아니면 게스트
  return GatheringRole.GUEST;
};
