import { useQuery } from '@tanstack/react-query';
import { getQuestions } from '../../apis/questions';

export const useGetQuestions = () => {
  const queryData = useQuery(['questions'], getQuestions);

  return queryData;
};
