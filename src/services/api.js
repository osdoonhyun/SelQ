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

  return response.data.data;
};

const useQuestionsQuery = ({ category }) => {
  const queryData = useQuery(['questions', category], () =>
    getQuestionsByCategory(category)
  );

  return queryData;
};

const getQuestionsByKeyword = async (keyword) => {
  const response = await serverApi.get('/questions');

  const filteredQuestions = response.data.data.filter((question) => {
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

export { useQuestionsQuery, useSearchQuestionsQuery };
