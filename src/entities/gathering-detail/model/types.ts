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
