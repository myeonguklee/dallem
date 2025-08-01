import type { UpdateUserPayload, User } from '@/entities/user/model';
import { ApiError, QUERY_KEYS } from '@/shared/api';
import { UseQueryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUser, updateUser } from './service';

export const useGetUser = (options?: Omit<UseQueryOptions<User>, 'queryKey' | 'queryFn'>) => {
  return useQuery<User>({
    queryKey: QUERY_KEYS.AUTH.USER.BASE,
    queryFn: getUser,
    retry: false,
    ...options,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<User, ApiError, UpdateUserPayload>({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUTH.USER.BASE });
    },
  });
};
