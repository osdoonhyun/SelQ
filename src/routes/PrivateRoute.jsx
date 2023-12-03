import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/common/useAuth';
import { PATH } from '../constant/paths';

export default function PrivateRoute({ isOnlyAdminAllowed = false, children }) {
  const { user } = useAuth();

  if (isOnlyAdminAllowed && user?.roles[0] !== 'admin') {
    alert('해당 페이지는 관리자만 접근이 가능합니다. 홈으로 이동합니다.');

    return <Navigate to={PATH.HOME} />;
  }

  return children;
}
