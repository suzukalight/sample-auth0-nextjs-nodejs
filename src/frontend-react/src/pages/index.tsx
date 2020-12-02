import React from 'react';

import DefaultLayout from '../components/layouts/DefaultLayout';
import Loading from '../components/atoms/Loading';

import { useAuth0User } from '../hooks/auth0-user';

const RootPage: React.FC = () => {
  const { user, isLoading } = useAuth0User();

  if (isLoading)
    return (
      <DefaultLayout>
        <Loading />
      </DefaultLayout>
    );

  return user ? (
    <DefaultLayout>
      <div className="flex flex-row justify-center align-middle m-12">Authorized</div>
    </DefaultLayout>
  ) : (
    <DefaultLayout>
      <div className="flex flex-row justify-center align-middle m-12">Unauthorized</div>
    </DefaultLayout>
  );
};

export default RootPage;
