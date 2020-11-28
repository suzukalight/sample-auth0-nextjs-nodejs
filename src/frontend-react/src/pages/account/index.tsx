import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import Loading from '../../components/atoms/Loading';
import LogoutButton from '../../components/atoms/LogoutButton';
import Profile from '../../components/molecules/Profile';

const AccountPage: React.FC = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [tokenLoaded, setTokenLoaded] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setTokenLoaded(true);
      }
    })();
    return () => {
      // cleanup
    };
  }, [getAccessTokenSilently]);

  if (isLoading || !tokenLoaded) return <Loading />;
  if (!isAuthenticated) return <Redirect to="/login" />;

  return (
    <div className="flex align-middle flex-col m-8">
      <div className="flex flex-row justify-center align-middle">
        <LogoutButton />
      </div>

      <Profile name={user.name} email={user.email} picture={user.picture} token={user} />
    </div>
  );
};

export default AccountPage;
