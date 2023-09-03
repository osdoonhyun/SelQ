import { useMutation, useQueryClient } from '@tanstack/react-query';
import { serverApi } from '../api';

const signUpHandler = async (userInput) => {
  const { data } = await serverApi.post('/auth/signup', userInput);
  return data;
};

const useSignUpHandler = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user) => signUpHandler(user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: (error) => {
      console.log('Sign Up Error', error.message);
    },
  });
};

export { useSignUpHandler };
