import { httpClient } from '@/shared/api';
import { API_ENDPOINTS } from '@/shared/config';
import { SigninPayload, SigninResponse, SignupPayload, SignupResponse } from '../model/types';

export const signupApi = async (payload: SignupPayload) =>
  await httpClient.post<SignupResponse>(API_ENDPOINTS.AUTH.SIGNUP, payload);

export const signinApi = async (payload: SigninPayload): Promise<SigninResponse> => {
  const { email, password } = payload;
  return await httpClient.post(API_ENDPOINTS.AUTH.SIGNIN, { email, password });
};

export const signoutApi = async () => {
  return await httpClient.post(API_ENDPOINTS.AUTH.SIGNOUT);
};
