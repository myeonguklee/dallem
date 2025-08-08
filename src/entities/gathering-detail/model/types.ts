export interface GatheringDetail {
  id: number;
  teamId: number;
  type: string;
  name: string;
  dateTime: string;
  registrationEnd: string;
  location: string;
  participantCount: number;
  capacity: number;
  image: string;
  createdBy: number;
  canceledAt: string | null;
}

export interface SessionData {
  expires: string;
  user: UserSession;
}

export interface UserSession {
  id: number;
}

// 모임 내 사용자 역할을 정의하는 enum
// 역할에 따라 버튼 UI가 달라짐
export enum GatheringRole {
  // 모임에 참여하지 않은 사용자
  GUEST = 'GUEST',
  // 모임에 참여한 사용자
  MEMBER = 'MEMBER',
  // 모임을 주최한 사용자
  HOST = 'HOST',
}
