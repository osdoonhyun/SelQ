import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkRegisteredEmail } from '../../apis/auth';

export const useCheckRegisteredEmail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (email) => checkRegisteredEmail(email),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['email'],
      });
    },
    onError: (error) => {
      console.log('Verify Registered Email Error', error.message);
    },
  });
};
