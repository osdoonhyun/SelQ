import { useQuery } from '@tanstack/react-query';
import { getQuestionsByCategory } from '../../apis/questions';

export const useGetQuestionsByCategory = ({ category }) => {
  const queryData = useQuery(['questions', category], () =>
    getQuestionsByCategory(category)
  );

  return queryData;
};
