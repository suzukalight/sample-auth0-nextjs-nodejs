import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

type Auth0User = {
  name: string;
  email: string;
  picture: string;
  token: object;
};
type Auth0UserHooksResult = {
  user: Auth0User | null;
  isLoading: boolean;
};
type Auth0UserHooksFunc = () => Auth0UserHooksResult;

export const useAuth0User: Auth0UserHooksFunc = () => {
  const { user, isLoading, getAccessTokenSilently } = useAuth0();
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

  if (isLoading || !tokenLoaded) {
    return {
      user: null,
      isLoading: true,
    };
  }

  return {
    user: user as Auth0User,
    isLoading: false,
  };
};
