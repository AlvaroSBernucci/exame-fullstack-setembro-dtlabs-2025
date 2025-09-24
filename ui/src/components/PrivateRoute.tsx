import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext/UserContext';
import { getToken } from '../utils/auth';

function PrivateRoute({ children }: React.PropsWithChildren) {
  const { login } = useContext(UserContext);
  const token = getToken();

  if (!token) return <Navigate to="/" replace />;
  else if (login) return children;
}

export default PrivateRoute;
