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
    },
  });
};
