import { httpClient } from '@/shared/api/httpClient';
import { API_ENDPOINTS } from '@/shared/config';

export type SignupPayload = {
  email: string;
  password: string;
  name: string;
  companyName: string;
};

export type SignupResponse = {
  status: number;
  message: string;
};

export const signup = async (payload: SignupPayload) =>
  await httpClient.post<SignupResponse>(API_ENDPOINTS.AUTH.SIGNUP, payload);
