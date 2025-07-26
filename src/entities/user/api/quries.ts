import type { PutUserFormValues, User } from '@/entities/user/model';
import { ApiError } from '@/shared/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from './queryKeys';
import { getUser, putUser } from './service';

export const useGetUser = () => {
  return useQuery({
    queryKey: QUERY_KEYS.AUTH.USER.BASE,
    queryFn: getUser,
  });
};

export const usePutUser = () => {
  const queryClient = useQueryClient();
  return useMutation<User, ApiError, PutUserFormValues>({
    mutationFn: putUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUTH.USER.BASE });
    },
  });
};
