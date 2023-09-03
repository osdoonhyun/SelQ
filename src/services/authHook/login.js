import { useMutation, useQueryClient } from '@tanstack/react-query';
import { serverApi } from '../api';

const logInHandler = async (userInput) => {
  const { data } = await serverApi.post('/auth/login', userInput);
  return data;
};

const useLogInHandler = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user) => logInHandler(user),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
  });
};

export default useLogInHandler;
