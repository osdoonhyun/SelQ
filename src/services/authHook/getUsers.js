import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { serverApi } from '../api';

const getUsers = async () => {
  const response = await serverApi.get('/users');
  return response.data;
};

const useUsersQuery = () => {
  const queryData = useQuery(['users'], () => getUsers());

  return queryData;
};

// admin 유저 관리
const updateUserByAdmin = async ({ userId, updatedInfo }) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  try {
    const { data } = await serverApi.patch(
      `/users/${userId}`,
      updatedInfo,
      config
    );
    return data;
  } catch (error) {
    throw error;
  }
};

const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userInfo) => updateUserByAdmin(userInfo),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['user', data.id],
      });
    },
    onError: (error) => {
      console.log('User Update Error', error.message);
    },
  });
};

// 유저 마이페이지
const updateUser = async ({ updatedInfo }) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  try {
    const { data } = await serverApi.patch('/auth/update', updatedInfo, config);

    return data;
  } catch (error) {
    throw error;
  }
};

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedInfo) => updateUser(updatedInfo),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['user', data.id],
      });
    },
    onError: (error) => {
      console.log('User Update Error', error.message);
    },
  });
};

export { useUsersQuery, useUpdateUserInfo, useUpdateUser };
