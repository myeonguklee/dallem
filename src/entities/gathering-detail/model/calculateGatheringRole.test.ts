import { Participant } from '@/entities/participant/model/types';
import { calculateGatheringRole } from './calculateGatheringRole';
import { GatheringDetail, UserSession } from './types';

// GatheringRole enum을 테스트 환경에서 사용하기 위해 임시로 정의합니다.
// 실제 프로젝트에서는 '@/widgets/BottomFloatingBar'에서 import 합니다.
enum GatheringRole {
  HOST = 'HOST',
  MEMBER = 'MEMBER',
  GUEST = 'GUEST',
}

describe('calculateGatheringRole', () => {
  // 테스트에서 공통으로 사용할 모의 데이터를 설정합니다.

  // 1. 모임 상세 정보 (주최자 ID는 10)
  const mockGathering: GatheringDetail = {
    id: 1,
    teamId: 1,
    type: 'MEETUP',
    name: '테스트 모임',
    dateTime: '2024-10-26T18:00:00Z',
    registrationEnd: '2024-10-25T18:00:00Z',
    location: '서울',
    participantCount: 2,
    capacity: 10,
    image: 'test.jpg',
    createdBy: 10, // 주최자 ID
    canceledAt: null,
  };

  // 2. 참여자 목록 (ID: 20, 30)
  const mockParticipants: Participant[] = [
    {
      teamId: 1,
      userId: 20,
      gatheringId: 1,
      joinedAt: '2024-10-20T10:00:00Z',
      User: {
        id: 20,
        email: 'member@test.com',
        name: '참여자1',
        companyName: 'A',
        image: 'img.jpg',
      },
    },
    {
      teamId: 1,
      userId: 30,
      gatheringId: 1,
      joinedAt: '2024-10-21T11:00:00Z',
      User: {
        id: 30,
        email: 'member2@test.com',
        name: '참여자2',
        companyName: 'B',
        image: 'img2.jpg',
      },
    },
  ];

  // 테스트 케이스 1: 사용자가 모임의 주최자인 경우
  it('should return HOST when the user is the creator of the gathering', () => {
    const sessionData: UserSession = { id: 10 }; // 주최자와 동일한 ID

    const result = calculateGatheringRole(sessionData, mockGathering, mockParticipants);

    expect(result).toBe(GatheringRole.HOST);
  });

  // 테스트 케이스 2: 사용자가 모임의 참여자(멤버)인 경우
  it('should return MEMBER when the user is in the participants list', () => {
    const sessionData: UserSession = { id: 20 }; // 참여자 목록에 있는 ID

    const result = calculateGatheringRole(sessionData, mockGathering, mockParticipants);

    expect(result).toBe(GatheringRole.MEMBER);
  });

  // 테스트 케이스 3: 주최자가 참여자 목록에도 포함된 경우 (HOST가 우선순위가 높아야 함)
  it('should return HOST even if the host is also listed as a participant', () => {
    const sessionData: UserSession = { id: 10 }; // 주최자 ID
    const participantsWithHost = [
      ...mockParticipants,
      // 주최자가 참여자 목록에 있는 상황을 시뮬레이션
      { ...mockParticipants[0], userId: 10, User: { ...mockParticipants[0].User, id: 10 } },
    ];

    const result = calculateGatheringRole(sessionData, mockGathering, participantsWithHost);

    // 참여자 목록에 있더라도 주최자 여부를 먼저 체크하므로 HOST가 반환되어야 함
    expect(result).toBe(GatheringRole.HOST);
  });

  // 테스트 케이스 4: 로그인했지만 모임과 관련 없는 사용자인 경우
  it('should return GUEST for a logged-in user who is not the host or a participant', () => {
    const sessionData: UserSession = { id: 99 }; // 관련 없는 ID

    const result = calculateGatheringRole(sessionData, mockGathering, mockParticipants);

    expect(result).toBe(GatheringRole.GUEST);
  });

  // 테스트 케이스 5: 로그인하지 않은 사용자인 경우 (세션 데이터가 undefined)
  it('should return GUEST when sessionData is undefined', () => {
    const sessionData = undefined;

    const result = calculateGatheringRole(sessionData, mockGathering, mockParticipants);

    expect(result).toBe(GatheringRole.GUEST);
  });

  // 테스트 케이스 6: 데이터가 불완전한 경우 (gathering 데이터가 없는 경우)
  it('should return GUEST when gathering data is missing', () => {
    const sessionData: UserSession = { id: 10 };

    // @ts-expect-error: 함수의 방어 로직을 테스트하기 위해 의도적으로 undefined를 전달합니다.
    const result = calculateGatheringRole(sessionData, undefined, mockParticipants);

    expect(result).toBe(GatheringRole.GUEST);
  });

  // 테스트 케이스 7: 데이터가 불완전한 경우 (participants 데이터가 없는 경우)
  it('should return GUEST when participants data is missing', () => {
    const sessionData: UserSession = { id: 10 };

    // @ts-expect-error: 함수의 방어 로직을 테스트하기 위해 의도적으로 undefined를 전달합니다.
    const result = calculateGatheringRole(sessionData, mockGathering, undefined);

    expect(result).toBe(GatheringRole.GUEST);
  });

  // 테스트 케이스 8: 참여자가 아무도 없는 모임의 경우
  it('should return GUEST for a logged-in user if the participants list is empty', () => {
    const sessionData: UserSession = { id: 99 }; // 관련 없는 ID
    const emptyParticipants: Participant[] = [];

    const result = calculateGatheringRole(sessionData, mockGathering, emptyParticipants);

    expect(result).toBe(GatheringRole.GUEST);
  });
});
