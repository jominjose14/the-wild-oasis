import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../../services/apiAuth.js';
import toast from 'react-hot-toast';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (session) => {
      queryClient.setQueryData(['user'], session.user);
      navigate('/dashboard', { replace: true });
    },
    onError: (err) => {
      console.error(err);
      toast.error('Provided email or password is incorrect');
    },
  });

  return { login, isLoading };
}
