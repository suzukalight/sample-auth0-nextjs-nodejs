import React from 'react';
import { withAuthenticationRequired } from '@auth0/auth0-react';

import Loading from '../../components/atoms/Loading';
import LogoutButton from '../../components/atoms/LogoutButton';
import Profile from '../../components/molecules/Profile';

import { useAuth0User } from '../../hooks/auth0-user';

const AccountPage: React.FC = () => {
  const { user, isLoading } = useAuth0User();

  if (isLoading) return <Loading />;

  return (
    <div className="flex align-middle flex-col m-8">
      <div className="flex flex-row justify-center align-middle">
        <LogoutButton />
      </div>

      {user ? (
        <Profile name={user.name} email={user.email} picture={user.picture} token={user} />
      ) : (
        <div>user not found.</div>
      )}
    </div>
  );
};

export default withAuthenticationRequired(AccountPage);
