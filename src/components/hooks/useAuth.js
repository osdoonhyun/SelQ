import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../slices/auth';

export default function useAuth() {
  const dispatch = useDispatch();
  const { isLoggedIn, user, token } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  return { isLoggedIn, user, token };
}
