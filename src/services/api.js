import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const serverApi = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
});

const getQuestionsByCategory = async (category) => {
  let url = '/questions';

  if (category.toLowerCase() !== 'all') {
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

const getAllQuestions = async (page) => {
  const params = {
    params: {
      take: 10,
      page,
    },
  };
  const response = await serverApi.get('/questions', params);

  return response.data.body;
};

const useAllQuestionsQuery = () => {
  const queryData = useQuery(['questions'], getAllQuestions);

  return queryData;
};

const filterQuestions = (questions, filterOption) => {
  const { 카테고리, 중요도, 날짜 } = filterOption;

  if (카테고리 && filterOption) {
    const filterCategories = filterOption?.카테고리 || [];
    const filteredQuestions = [];

    filterCategories?.forEach((option) => {
      if (option.isChecked) {
        const filteredQuestionsForCategory = questions?.filter(
          (question) => question.category === option.label
        );
        filteredQuestions.push(...filteredQuestionsForCategory);
      }
    });

    return filteredQuestions;
  }

  switch (중요도) {
    case '높은순':
      return questions?.sort((a, b) => b.importance - a.importance);
    case '낮은순':
      return questions?.sort((a, b) => a.importance - b.importance);
    default:
      break;
  }

  switch (날짜) {
    case '최신순':
      return questions?.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    case '오래된순':
      return questions?.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    default:
      break;
  }

  return questions;
};

const useQuestionsByFilteringQuery = (currentPage, filterOption) => {
  const queryData = useQuery(
    ['questions', currentPage],
    () => getAllQuestions(currentPage),
    {
      select: (data) => ({
        ...data,
        questions: filterQuestions(data.data, filterOption),
      }),
    }
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

const getQuestionsByImportance = async (page) => {
  const params = {
    params: {
      take: 5,
      page,
    },
  };
  const response = await serverApi.get('/questions', params);

  const hasImportance = response.data.body.data.filter(
    (question) => question.importance >= 1
  );

  return response.data.body;
};

const useImportantQuestionsQuery = (currentPage) => {
  const queryData = useQuery(['questions', currentPage], () =>
    getQuestionsByImportance(currentPage)
  );

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
  useAllQuestionsQuery,
  useQuestionsByFilteringQuery,
  useQuestionDetailQuery,
  useImportantQuestionsQuery,
  useSearchQuestionsQuery,
  serverApi,
};
