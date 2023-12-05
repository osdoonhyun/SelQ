import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserInfoByAdmin } from '../../apis/users';

export const useUpdateUserInfoByAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userInfo) => updateUserInfoByAdmin(userInfo),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['user', data.id],
      });
    },
    onError: (error) => {
      console.log('User Update Error', error.message);
      alert('오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      throw new Error();
    },
  });
};
