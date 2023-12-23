import { useQuery } from '@tanstack/react-query';
import { getQuestions } from '../../apis/questions';
import { questionKeys } from '../../constant/queryKeyFactory';

export const useGetQuestions = () => {
  const queryData = useQuery(questionKeys.all, getQuestions, {
    enabled: false,
    staleTime: Infinity,
  });
  return queryData;
};
