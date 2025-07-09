import { axiosInstance } from '@/shared/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { CreateGatheringRequest, Gathering } from '../model/types';

// tanstack/react-query 사용할 key 관리

export const gatheringKeys = {
  all: ['gatherings'] as const,
  lists: () => [...gatheringKeys.all, 'list'] as const,
  list: (filters: string) => [...gatheringKeys.lists(), { filters }] as const, // 필터링이 있다면
  details: () => [...gatheringKeys.all, 'detail'] as const,
  detail: (id: number) => [...gatheringKeys.details(), id] as const,
};

// API 함수

// 모임 목록 조회
const getGatherings = async (): Promise<Gathering[]> => {
  const response: AxiosResponse<Gathering[]> = await axiosInstance.get('/gatherings');
  return response.data;
};

// 특정 모임 조회
const getGatheringById = async (id: number): Promise<Gathering> => {
  const response: AxiosResponse<Gathering> = await axiosInstance.get(`/gatherings/${id}`);
  return response.data;
};

// 새 모임 생성
const createGathering = async (newGathering: CreateGatheringRequest): Promise<Gathering> => {
  const formData = new FormData();
  Object.entries(newGathering).forEach(([key, value]) => {
    formData.append(key, value as string | Blob); // File은 Blob의 서브타입
  });

  const response: AxiosResponse<Gathering> = await axiosInstance.post('/gatherings', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

// TanStack Query 훅

// 모임 조회
export const useGatherings = () => {
  return useQuery<Gathering[]>({
    queryKey: gatheringKeys.lists(),
    queryFn: getGatherings,
    // staleTime: 1000 * 60 * 5, //  ex) 5분 동안 캐시 유지
  });
};

// 모임 상세 조회
export const useGathering = (id: number) => {
  return useQuery<Gathering>({
    queryKey: gatheringKeys.detail(id),
    queryFn: () => getGatheringById(id),
    enabled: !!id,
  });
};

// 모임 생성 훅
export const useCreateGathering = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGathering,
    onSuccess: () => {
      // 모임 생성이 완료되면 목록 쿼리를 무효화하여 최신 데이터로 갱신
      queryClient.invalidateQueries({ queryKey: gatheringKeys.lists() });
    },
    onError: (error) => {
      console.error('모임 생성 실패:', error);
    },
  });
};
