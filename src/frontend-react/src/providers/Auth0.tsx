import React from 'react';
import { Auth0Provider as RawAuth0Provider, AppState } from '@auth0/auth0-react';

import { history } from '../hooks/router';

const onRedirectCallback = (appState: AppState) => {
  history.push(appState && appState.returnTo ? appState.returnTo : window.location.pathname);
};

const Auth0Provider: React.FC = ({ children }) => (
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

export default Auth0Provider;
