import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editQuestion } from '../../apis/questionManagement';

export const useEditQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => editQuestion(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['edit'],
      });
    },
    onError: (error) => {
      console.log('Edit Question Error', error.message);
    },
  });
};
