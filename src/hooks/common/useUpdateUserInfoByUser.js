import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserInfoByUser } from '../../apis/users';

export const useUpdateUserInfoByUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedInfo) => updateUserInfoByUser(updatedInfo),
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
