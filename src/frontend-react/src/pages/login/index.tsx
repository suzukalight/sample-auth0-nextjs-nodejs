import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Redirect } from 'react-router-dom';

import LoginButton from '../../components/atoms/LoginButton';
import Loading from '../../components/atoms/Loading';

const LoginPage: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <Loading />;
  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <div className="flex align-middle flex-col m-8">
      <div className="flex flex-row justify-center align-middle">
        <LoginButton />
      </div>
    </div>
  );
};

export default LoginPage;
