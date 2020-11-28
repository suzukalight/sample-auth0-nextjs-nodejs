import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import AccountPage from './account';
import Loading from '../components/atoms/Loading';

const RootPage: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <Loading />;

  return isAuthenticated ? (
    <AccountPage />
  ) : (
    <div className="flex flex-row justify-center align-middle m-12">not authorized.</div>
  );
};

export default RootPage;
