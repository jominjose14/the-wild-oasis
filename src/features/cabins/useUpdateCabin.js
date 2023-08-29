import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCabin as updateCabinApi } from '../../services/apiCabins.js';
import toast from 'react-hot-toast';

export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const {
    mutate: updateCabin,
    isLoading: isUpdating,
    error: updateError,
  } = useMutation({
    mutationFn: ({ updatedCabinData, id }) =>
      updateCabinApi(updatedCabinData, id),
    onSuccess: () => {
      toast.success('Cabin updated successfully');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateCabin, isUpdating, updateError };
}
