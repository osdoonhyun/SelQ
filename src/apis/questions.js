import { serverApi } from './api';

export const getQuestions = async () => {
  const response = await serverApi.get('/questions', {
    params: {
      take: 50,
    },
  });

  return response.data.body;
};

export const getQuestionsByCategory = async (category) => {
  let url = '/questions';

  if (category.toLowerCase() !== 'all') {
    url += `?category=${category.toLowerCase()}`;
  }
  const response = await serverApi.get(url);

  return response.data.body.data;
};

export const getQuestionDetailById = async (questionId) => {
  const response = await serverApi.get(`/questions/${questionId}`);

  return response.data.body;
};

export const getQuestionsByKeyword = async (keyword) => {
  const response = await serverApi.get('/questions', {
    params: {
      take: 50,
    },
  });

  const filteredQuestions = response.data.body.data.filter((question) => {
    const lowQuestion = question.question.toLowerCase().trim();
    const lowercaseKeyword = keyword.toLowerCase().trim();

    return lowQuestion.includes(lowercaseKeyword);
  });

  return filteredQuestions;
};

export const getQuestionsByFilteringOption = async (page, queryString) => {
  const response = await serverApi.get(`/questions?${queryString}`, {
    params: {
      take: 10,
      page,
    },
  });

  return response.data.body;
};
