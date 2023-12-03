import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/common/useAuth';
import { PATH } from '../constant/paths';

export default function PrivateRoute({ isOnlyAdminAllowed = false, children }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOnlyAdminAllowed && user?.roles[0] !== 'admin') {
      alert('해당 페이지는 관리자만 접근이 가능합니다. 홈으로 이동합니다.');

      navigate(PATH.HOME);
    }
  }, [isOnlyAdminAllowed, user, navigate]);

  return children;
}
