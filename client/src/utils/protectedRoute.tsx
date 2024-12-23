import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../contexts';

function RequireAuth({ children: children }: { children: React.ReactNode }) {
  const { user } = useUser();

  const location = useLocation();

  return user ? (
    children
  ) : (
    <Navigate to="/" replace state={{ path: location.pathname }} />
  );
}

export default RequireAuth;