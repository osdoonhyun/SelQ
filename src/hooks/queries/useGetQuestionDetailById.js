import { useQuery } from '@tanstack/react-query';
import { getQuestionDetailById } from '../../apis/questions';

export const useQuestionDetailQuery = (questionId) => {
  const queryKey = ['question', questionId];
  const queryData = useQuery(queryKey, () => getQuestionDetailById(questionId));

  return queryData;
};
