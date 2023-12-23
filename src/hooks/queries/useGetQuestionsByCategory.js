import { useQuery } from '@tanstack/react-query';
import { getQuestionsByCategory } from '../../apis/questions';
import { questionKeys } from '../../constant/queryKeyFactory';

export const useGetQuestionsByCategory = ({ category }) => {
  const queryData = useQuery(questionKeys.categories(), () =>
    getQuestionsByCategory(category)
  );

  return queryData;
};
