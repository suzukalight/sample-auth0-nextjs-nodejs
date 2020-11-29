import React from 'react';

import Loading from '../components/atoms/Loading';
import LoginButton from '../components/atoms/LoginButton';
import LogoutButton from '../components/atoms/LogoutButton';

import { useAuth0User } from '../hooks/auth0-user';

const RootPage: React.FC = () => {
  const { user, isLoading } = useAuth0User();

  if (isLoading) return <Loading />;

  return user ? (
    <div className="w-full h-full p-8 flex justify-center align-middle flex-col">
      <div className="flex flex-row justify-center align-middle m-12">authorized.</div>
      <div className="flex flex-row justify-center align-middle">
        <LogoutButton />
      </div>
    </div>
  ) : (
    <div className="w-full h-full p-8 flex justify-center align-middle flex-col">
      <div className="flex flex-row justify-center align-middle m-12">not authorized.</div>
      <div className="flex flex-row justify-center align-middle">
        <LoginButton />
      </div>
    </div>
  );
};

export default RootPage;
