// enums

export type GatheringType = 'DALLAEMFIT' | 'OFFICE_STRETCHING' | 'MINDFULNESS' | 'WORKATION';

export type GatheringLocation = '건대입구' | '을지로3가' | '신림' | '홍대입구';

// interfaces

// (GET /gatherings, GET /gatherings/{id} )
export interface Gathering {
  teamId: number;
  id: number;
  type: GatheringType;
  name: string;
  dateTime: string;
  registrationEnd: string;
  location: GatheringLocation;
  participantCount: number;
  capacity: number;
  image: string;
  createdBy: number;
  canceledAt: string | null;
}

// (POST /{teamId}/gatherings)
export interface CreateGatheringRequest {
  location: GatheringLocation;
  type: Omit<GatheringType, 'DALLAEMFIT'>; // api 명세에서 'DALLAEMFIT'은 모임 생성시 선택 못하게 되어 있음 ...
  name: string;
  dateTime: string; // "YYYY-MM-DDTHH:MM:SS"
  capacity: number;
  image: File; // 'binary' 타입이므로 File 객체로 처리
  registrationEnd?: string; // 선택적 프로퍼티
}
