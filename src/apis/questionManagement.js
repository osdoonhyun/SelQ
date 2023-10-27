import { serverApi } from './api';

// 질문, 답변 등록 (admin)
export const registerQuestion = async (formData) => {
  const { question, answer, token } = formData;
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  const { data } = await serverApi.post('/questions', question, config);

  const questionId = data.body.id;

  const { status } = await serverApi.post('/answers', {
    answers: answer.answers,
    question: questionId,
  });

  return { status, questionId };
};

// 질문 수정 (admin)
export const editQuestion = async (formData) => {
  const { questionId, editData, token } = formData;
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  const { status } = await serverApi.patch(
    `/questions/${questionId}`,
    editData,
    config
  );

  return { status, questionId };
};

// 질문 삭제 (admin)
export const deleteQuestion = async (formData) => {
  const { deletedId, token } = formData;
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  const { data } = await serverApi.delete(
    `/questions/${deletedId?.id}`,
    config
  );

  return data.body;
};
