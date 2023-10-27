import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteQuestion } from '../../apis/questionManagement';

export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => deleteQuestion(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    },
    onError: (error) => {
      console.log('Delete Question Error', error.message);
    },
  });
};
