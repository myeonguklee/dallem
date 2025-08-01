import { Participant } from '@/entities/participant/model/types';
import { GatheringRole } from '@/widgets/BottomFloatingBar';
import { GatheringDetail, UserSession } from './types';

export const calculateGatheringRole = (
  sessionData: UserSession | undefined, // user도 undefined일 수 있음을 명시
  gathering: GatheringDetail,
  participantsData: Participant[],
): GatheringRole => {
  // 데이터가 하나라도 없으면 GUEST
  if (!sessionData || !gathering || !participantsData) {
    return GatheringRole.GUEST;
  }

  const currentUserId = sessionData.id;

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
