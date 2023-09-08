import { useMutation, useQueryClient } from '@tanstack/react-query';
import { serverApi } from '../api';

const registerQuestion = async (formData) => {
  const { question, answer } = formData;
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  try {
    const { data } = await serverApi.post('/questions', question, config);
    const questionId = data.id;

    const { status } = await serverApi.post('/answers', {
      answers: answer.answers,
      question: questionId,
    });
    return { status, questionId };
  } catch (error) {
    throw error;
  }
};

const useRegisterQuestion = () => {
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

export { useRegisterQuestion };
