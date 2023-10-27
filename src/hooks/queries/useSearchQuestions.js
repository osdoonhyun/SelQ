import { useQuery } from '@tanstack/react-query';
import { getQuestionsByKeyword } from '../../apis/questions';

export const useSearchQuestions = ({ searchInput: keyword }) => {
  const queryKey = keyword.length > 0 ? ['questions', keyword] : ['questions'];
  const queryData = useQuery(queryKey, () => getQuestionsByKeyword(keyword));

  return queryData;
};
