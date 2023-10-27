import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerQuestion } from '../../apis/questionManagement';

export const useRegisterQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => registerQuestion(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['register'],
      });
    },
    onError: (error) => {
      console.log('Register Question Error', error.message);
    },
  });
};
