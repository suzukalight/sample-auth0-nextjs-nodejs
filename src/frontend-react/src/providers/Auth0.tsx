import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Auth0Provider as RawAuth0Provider, AppState } from '@auth0/auth0-react';

const createRedirectCallback = (history: any) => (appState: AppState) => {
  history.replace({
    pathname: appState && appState.returnTo ? appState.returnTo : window.location.pathname,
    search: '',
  });
};

const Auth0Provider: React.FC = ({ children }) => {
  const history = useHistory();
  const onRedirectCallback = useMemo(() => createRedirectCallback(history), [history]);

  return (
    <RawAuth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN!}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID!}
      audience={process.env.REACT_APP_AUTH0_AUDIENCE}
      scope="admin"
      redirectUri={`${window.location.origin}/callback`}
      onRedirectCallback={onRedirectCallback}
      useRefreshTokens
    >
      {children}
    </RawAuth0Provider>
  );
};

export default Auth0Provider;
