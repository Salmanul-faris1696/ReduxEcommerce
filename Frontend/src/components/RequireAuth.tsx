import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }:any) => {
  const token = Cookies.get('token');

  return token ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default RequireAuth;
