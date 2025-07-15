import { CreateGatheringRequest, Gathering } from '@/entities/gathering/model/types';
import { httpClient } from '@/shared/api';
import { API_ENDPOINTS } from '@/shared/config/api';

// 모임 목록 조회
export const getGatherings = async (filters?: object): Promise<Gathering[]> => {
  const params = new URLSearchParams();

  if (filters && typeof filters === 'object') {
    if ('type' in filters && filters.type) {
      params.append('type', String(filters.type));
    }
    if ('location' in filters && filters.location) {
      params.append('location', String(filters.location));
    }
    if ('dateRange' in filters && filters.dateRange && typeof filters.dateRange === 'object') {
      const dateRange = filters.dateRange as Record<string, unknown>;
      if (dateRange.start) params.append('startDate', String(dateRange.start));
      if (dateRange.end) params.append('endDate', String(dateRange.end));
    }
    if ('searchQuery' in filters && filters.searchQuery) {
      params.append('search', String(filters.searchQuery));
    }
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
