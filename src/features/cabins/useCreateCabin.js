import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin as createCabinApi } from '../../services/apiCabins.js';
import toast from 'react-hot-toast';

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const {
    mutate: createCabin,
    isLoading: isCreating,
    error: createError,
  } = useMutation({
    mutationFn: createCabinApi,
    onSuccess: () => {
      toast.success('Cabin created successfully');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createCabin, isCreating, createError };
}
