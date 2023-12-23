import { useQuery } from '@tanstack/react-query';
import { getQuestionsByKeyword } from '../../apis/questions';
import { questionKeys } from '../../constant/queryKeyFactory';

export const useSearchQuestions = ({ searchInput: keyword }) => {
  const queryKey =
    keyword.length > 0 ? questionKeys.keyword(keyword) : questionKeys.all;
  const queryData = useQuery(queryKey, () => getQuestionsByKeyword(keyword));

  return queryData;
};
