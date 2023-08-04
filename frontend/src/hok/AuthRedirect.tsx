import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { selectIsAuth } from '../redux/feature/auth';

interface AuthRedirectType {
  children: React.ReactNode;
}

const AuthRedirect = ({ children }: AuthRedirectType) => {
  const isAuth = useSelector((state: RootState) =>
    selectIsAuth(state.auth.data)
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate('/', { replace: true });
    }
  }, []);

  return children;
};

export default AuthRedirect;
