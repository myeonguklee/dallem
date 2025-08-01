import type { UpdateUserPayload, User } from '@/entities/user/model';
import { ApiError, QUERY_KEYS } from '@/shared/api';
import { UseQueryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { getUser, updateUser } from './service';

export const useGetUser = (options?: Omit<UseQueryOptions<User>, 'queryKey' | 'queryFn'>) => {
  return useQuery<User>({
    queryKey: QUERY_KEYS.AUTH.USER.BASE,
    queryFn: getUser,
    retry: false,
    ...options,
  });
};

export const useUpdateUser = (callback?: {
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation<User, ApiError, UpdateUserPayload>({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUTH.USER.BASE });
      callback?.onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message);
      callback?.onError?.(error);
    },
  });
};
