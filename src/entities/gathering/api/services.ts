import {
  CreateGatheringRequest,
  Gathering,
  GatheringFilters,
} from '@/entities/gathering/model/types';
import { httpClient } from '@/shared/api';
import { API_ENDPOINTS } from '@/shared/config/api';

// 모임 목록 조회
export const getGatherings = async (filters?: GatheringFilters): Promise<Gathering[]> => {
  const params = new URLSearchParams();

  if (filters) {
    if (filters.id) params.append('id', filters.id);
    if (filters.type) params.append('type', filters.type);
    if (filters.location) params.append('location', filters.location);
    if (filters.date) params.append('date', filters.date);
    if (filters.createdBy !== undefined) params.append('createdBy', String(filters.createdBy));
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
    if (filters.limit !== undefined) params.append('limit', String(filters.limit));
    if (filters.offset !== undefined) params.append('offset', String(filters.offset));
  }

  const queryString = params.toString();
  const url = queryString
    ? `${API_ENDPOINTS.GATHERINGS.LIST}?${queryString}`
    : API_ENDPOINTS.GATHERINGS.LIST;

  return await httpClient.get<Gathering[]>(url);
};

// 특정 모임 조회
export const getGatheringById = async (id: number): Promise<Gathering> => {
  return await httpClient.get<Gathering>(API_ENDPOINTS.GATHERINGS.DETAIL(id));
};

// 새 모임 생성
export const createGathering = async (newGathering: CreateGatheringRequest): Promise<Gathering> => {
  return await httpClient.post<Gathering>(API_ENDPOINTS.GATHERINGS.CREATE, newGathering, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
