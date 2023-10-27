import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../apis/users';
import { filterUsers } from '../../utils/filterUsers';

export const useGetUsers = (currentPage, filterOption) => {
  const queryData = useQuery(
    ['users', currentPage],
    () => getUsers(currentPage),
    {
      select: (data) => ({
        ...data,
        users: filterUsers(data.data, filterOption),
      }),
      keepPreviousData: true,
    }
  );

  return queryData;
};
