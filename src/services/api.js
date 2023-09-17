import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const serverApi = axios.create({
  baseURL: 'http://localhost:8000/api',
});

const getQuestionsByCategory = async (category) => {
  let url = '/questions';
  if (category !== 'all') {
    url += `?category=${category.toLowerCase()}`;
  }
  const response = await serverApi.get(url);

  return response.data.body.data;
};

const useQuestionsQuery = ({ category }) => {
  const queryData = useQuery(['questions', category], () =>
    getQuestionsByCategory(category)
  );

  return queryData;
};

const getQuestionDetailById = async (questionId) => {
  try {
    const response = await serverApi.get(`/questions/${questionId}`);
    if (response.status === 200) {
      return response.data.body;
    }
  } catch (error) {
    console.log('Get Question Detail Error', error.message);
  }
};

const useQuestionDetailQuery = (questionId) => {
  const queryKey = ['question', questionId];
  const queryData = useQuery(queryKey, () => getQuestionDetailById(questionId));

  return queryData;
};

const getQuestionsByImportance = async () => {
  const response = await serverApi.get('/questions');

  const hasImportance = response.data.body.data.filter(
    (question) => question.importance >= 1
  );

  return hasImportance;
};

const useImportantQuestionsQuery = () => {
  const queryData = useQuery(['questions'], getQuestionsByImportance);

  return queryData;
};

const getQuestionsByKeyword = async (keyword) => {
  const response = await serverApi.get('/questions');

  const filteredQuestions = response.data.body.data.filter((question) => {
    const lowQuestion = question.question.toLowerCase().trim();
    const lowercaseKeyword = keyword.toLowerCase().trim();

    return lowQuestion.includes(lowercaseKeyword);
  });

  return filteredQuestions;
};

const useSearchQuestionsQuery = ({ searchInput: keyword }) => {
  const queryData = useQuery(['questions', keyword], () =>
    getQuestionsByKeyword(keyword)
  );

  return queryData;
};

export {
  useQuestionsQuery,
  useQuestionDetailQuery,
  useImportantQuestionsQuery,
  useSearchQuestionsQuery,
  serverApi,
};
