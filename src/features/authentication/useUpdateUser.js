import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCurrentUser as updateUserApi } from '../../services/apiAuth.js';
import toast from 'react-hot-toast';

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const {
    mutate: updateUser,
    isLoading: isUpdating,
    error: updateError,
  } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: (user) => {
      toast.success('User account updated successfully');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating, updateError };
}
