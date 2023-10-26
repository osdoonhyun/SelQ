import { useMutation, useQueryClient } from '@tanstack/react-query';
import { serverApi } from '../api';

const deleteQuestion = async (formData) => {
  const { deletedId, token } = formData;

  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  try {
    const { data } = await serverApi.delete(
      `/questions/${deletedId?.id}`,
      config
    );

    if (data.body === 200) {
      return data.body;
    }
  } catch (error) {
    throw error;
  }
};

const useDeleteQuestion = () => {
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

export { useDeleteQuestion };
