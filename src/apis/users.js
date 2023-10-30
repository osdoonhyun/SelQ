import { serverApi } from './api';

// 유저 정보 조회
export const getUsers = async (page) => {
  const params = {
    params: {
      take: 10,
      page,
    },
  };
  const response = await serverApi.get('/users', params);

  return response.data.body;
};

// 유저 정보 수정 - Admin
export const updateUserInfoByAdmin = async ({ userId, updatedInfo, token }) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  const { data } = await serverApi.patch(
    `/users/${userId}`,
    updatedInfo,
    config
  );
  return data.body;
};

// 유저 정보 수정 - User
export const updateUserInfoByUser = async ({ updatedInfo, token }) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  const { data } = await serverApi.patch('/auth/update', updatedInfo, config);

  return data.body;
};

// 유저 정보 삭제
