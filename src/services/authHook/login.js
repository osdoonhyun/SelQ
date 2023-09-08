import { useMutation, useQueryClient } from '@tanstack/react-query';
import { serverApi } from '../api';

const logInHandler = async (userInput) => {
  try {
    const { data } = await serverApi.post('/auth/login', userInput);
    return data;
  } catch (error) {
    throw error;
  }
};

const useLogInHandler = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user) => logInHandler(user),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: (error) => {
      console.log('Login Error', error.message);
    },
  });
};

export default useLogInHandler;
