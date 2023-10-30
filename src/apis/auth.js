import { serverApi } from './api';

// 회원가입
export const signUpHandler = async (userInput) => {
  const { status } = await serverApi.post('/auth/signup', userInput);

  return status; // 201
};

// 이메일 등록 검증
export const checkRegisteredEmail = async (email) => {
  try {
    const { status } = await serverApi.post('/users/email', {
      email,
    });

    if (status === 201) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return false;
    }
    throw error;
  }
};
// 인증번호 전송
export const sendVerificationCode = async (email) => {
  await serverApi.post('/auth/email/send', {
    email,
  });
};

// 인증번호 검증
export const checkVerificationCode = async (data) => {
  const { email, code } = data;

  const { status } = await serverApi.post('/auth/email/check', {
    email,
    code,
  });

  if (status === 201) {
    return true;
  } else {
    return false;
  }
};
