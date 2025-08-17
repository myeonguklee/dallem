import type { Gathering, GatheringLocation, GatheringType } from '@/entities/gathering/model/types';
import { HttpResponse, http } from 'msw';

// Helper function to create dynamic dates
const createEventDates = (daysFromNow: number, hour: number) => {
  const eventDate = new Date();
  eventDate.setDate(eventDate.getDate() + daysFromNow);
  eventDate.setHours(hour, 0, 0, 0);

  const registrationEndDate = new Date(eventDate);
  registrationEndDate.setDate(eventDate.getDate() - 1);
  registrationEndDate.setHours(23, 59, 59, 0);

  const toISOStringWithSeconds = (date: Date) => date.toISOString().slice(0, 19);

  return {
    dateTime: toISOStringWithSeconds(eventDate),
    registrationEnd: toISOStringWithSeconds(registrationEndDate),
  };
};

const event1 = createEventDates(2, 10);
const event2 = createEventDates(3, 14);
const event3 = createEventDates(4, 19);

// 모킹용 샘플 데이터
const mockGatherings: Gathering[] = [
  {
    teamId: 1,
    id: 1,
    type: 'DALLAEMFIT' as GatheringType,
    name: '달램핏 오피스 스트레칭',
    dateTime: event1.dateTime,
    registrationEnd: event1.registrationEnd,
    location: '건대입구' as GatheringLocation,
    participantCount: 5,
    capacity: 20,
    image: '/gathering-default-image.png',
    createdBy: 1,
    canceledAt: null,
  },
  {
    teamId: 1,
    id: 2,
    type: 'WORKATION' as GatheringType,
    name: '워케이션 힐링 모임',
    dateTime: event2.dateTime,
    registrationEnd: event2.registrationEnd,
    location: '홍대입구' as GatheringLocation,
    participantCount: 8,
    capacity: 15,
    image: '/gathering-default-image.png',
    createdBy: 2,
    canceledAt: null,
  },
  {
    teamId: 1,
    id: 3,
    type: 'MINDFULNESS' as GatheringType,
    name: '마음챙김 명상 모임',
    dateTime: event3.dateTime,
    registrationEnd: event3.registrationEnd,
    location: '신림' as GatheringLocation,
    participantCount: 3,
    capacity: 10,
    image: '/gathering-default-image.png',
    createdBy: 1,
    canceledAt: null,
  },
];

// 참가자 데이터 (여러 시나리오 준비)
const mockParticipantsBeforeJoin = [
  {
    teamId: 1,
    userId: 1,
    gatheringId: 1,
    joinedAt: '2024-01-15T10:00:00Z',
    User: {
      id: 1,
      email: 'user1@example.com',
      name: '김철수',
      companyName: '테크컴퍼니',
      image: '',
    },
  },
  {
    teamId: 1,
    userId: 2,
    gatheringId: 1,
    joinedAt: '2024-01-16T14:30:00Z',
    User: {
      id: 2,
      email: 'user2@example.com',
      name: '이영희',
      companyName: '디자인스튜디오',
      image: '',
    },
  },
  {
    teamId: 1,
    userId: 3,
    gatheringId: 1,
    joinedAt: '2024-01-17T09:15:00Z',
    User: {
      id: 3,
      email: 'user3@example.com',
      name: '박민수',
      companyName: '마케팅그룹',
      image: '',
    },
  },
];

const mockParticipantsAfterJoin = [
  ...mockParticipantsBeforeJoin,
  {
    teamId: 1,
    userId: 5, // 현재 로그인한 사용자
    gatheringId: 1,
    joinedAt: new Date().toISOString(),
    User: {
      id: 5,
      email: 'test@example.com',
      name: '테스트 사용자',
      companyName: '테스트 회사',
      image: '',
    },
  },
];

// 참가 상태 추적 (모임 ID별로 관리)
const userJoinStatus = new Map<number, boolean>();

export const gatheringHandlers = [
  // 모임 목록 조회
  http.get('*/gatherings', ({ request }) => {
    const url = new URL(request.url);
    const type = url.searchParams.get('type') as GatheringType | null;
    const location = url.searchParams.get('location') as GatheringLocation | null;
    const createdBy = url.searchParams.get('createdBy');
    const limit = url.searchParams.get('limit');
    const offset = url.searchParams.get('offset');

    let filteredGatherings = [...mockGatherings];

    // 생성자 필터
    if (createdBy) {
      filteredGatherings = filteredGatherings.filter((g) => g.createdBy === parseInt(createdBy));
    }

    // 타입 필터
    if (type) {
      filteredGatherings = filteredGatherings.filter((g) => g.type === type);
    }

    // 위치 필터
    if (location) {
      filteredGatherings = filteredGatherings.filter((g) => g.location === location);
    }

    // 페이지네이션
    if (offset && limit) {
      const offsetNum = parseInt(offset);
      const limitNum = parseInt(limit);
      filteredGatherings = filteredGatherings.slice(offsetNum, offsetNum + limitNum);
    }

    return HttpResponse.json(filteredGatherings);
  }),

  // 참여한 모임 목록
  http.get('*/gatherings/joined', () => {
    const joinedGatherings = mockGatherings.slice(0, 2).map((gathering) => ({
      ...gathering,
      participantCount: gathering.participantCount + 1,
      isJoined: true,
      joinedAt: new Date().toISOString(),
    }));

    return HttpResponse.json(joinedGatherings);
  }),

  // 개별 모임 조회
  http.get('*/gatherings/:id', ({ params }) => {
    const id = parseInt(params.id as string);
    const gathering = mockGatherings.find((g) => g.id === id);

    if (!gathering) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(gathering);
  }),

  // 모임 생성
  http.post('*/gatherings', async ({ request }) => {
    const formData = await request.formData();
    const newGathering: Gathering = {
      teamId: 1,
      id: mockGatherings.length + 1,
      type: formData.get('type') as GatheringType,
      name: formData.get('name') as string,
      dateTime: formData.get('dateTime') as string,
      registrationEnd: formData.get('registrationEnd') as string,
      location: formData.get('location') as GatheringLocation,
      participantCount: 0,
      capacity: parseInt(formData.get('capacity') as string),
      image: '/gathering-default-image.png',
      createdBy: 1,
      canceledAt: null,
    };

    mockGatherings.push(newGathering);
    return HttpResponse.json(newGathering, { status: 201 });
  }),

  // 모임 참가
  http.post('*/gatherings/:id/join', ({ params }) => {
    const id = parseInt(params.id as string);

    // 참가 상태를 true로 변경
    userJoinStatus.set(id, true);

    return HttpResponse.json(
      {
        message: '모임에 참가했습니다.',
        success: true,
      },
      { status: 201 },
    );
  }),

  // 모임 참가 취소
  http.delete('*/gatherings/:id/leave', ({ params }) => {
    const id = parseInt(params.id as string);

    // 참가 상태를 false로 변경
    userJoinStatus.set(id, false);

    return HttpResponse.json({
      message: '모임 참가를 취소했습니다.',
      success: true,
    });
  }),

  // 모임 취소
  http.patch('*/gatherings/:id/cancel', ({ params }) => {
    const id = parseInt(params.id as string);
    return HttpResponse.json({
      message: '모임이 취소되었습니다.',
      gatheringId: id,
    });
  }),

  // 모임 참가자 목록
  http.get('*/gatherings/:id/participants', ({ params }) => {
    const id = parseInt(params.id as string);

    // 참가 상태에 따라 다른 데이터 반환
    const hasJoined = userJoinStatus.get(id) || false;
    const participants = hasJoined ? mockParticipantsAfterJoin : mockParticipantsBeforeJoin;

    return HttpResponse.json(participants);
  }),
];

export { mockGatherings, mockParticipantsBeforeJoin, mockParticipantsAfterJoin };
