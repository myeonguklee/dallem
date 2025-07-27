import { httpClient } from '@/shared/api/httpClient';
import { API_ENDPOINTS } from '@/shared/config';

export const signinApi = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ token: string }> => {
  console.log('[API]');
  return await httpClient.post(API_ENDPOINTS.AUTH.SIGNIN, {
    email,
    password,
  });
};
