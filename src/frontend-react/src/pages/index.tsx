import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import LoginButton from '../components/atoms/LoginButton';
import LogoutButton from '../components/atoms/LogoutButton';

const RootPage: React.FC = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        });
        setToken(token);
      } catch (e) {
        console.warn(e);
      }
    })();
    return () => {
      // cleanup
    };
  }, [getAccessTokenSilently]);

  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      <LoginButton /> / <LogoutButton />
      {isAuthenticated ? (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>{token}</p>
        </div>
      ) : (
        <p>not authorized.</p>
      )}
    </div>
  );
};

export default RootPage;
