import React from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';

import Loading from '../../components/atoms/Loading';
import Profile from '../../components/molecules/Profile';
import DefaultLayout from '../../components/layouts/DefaultLayout';

import { useAuth0User } from '../../hooks/auth0-user';

const AccountPage: React.FC = () => {
  const { user, isLoading } = useAuth0User();

  if (isLoading)
    return (
      <DefaultLayout>
        <Loading />
      </DefaultLayout>
    );

  return (
    <DefaultLayout>
      {user ? (
        <Profile name={user.name} email={user.email} picture={user.picture} token={user} />
      ) : (
        <div>user not found.</div>
      )}
    </DefaultLayout>
  );
};

export default withAuthenticationRequired(AccountPage);
