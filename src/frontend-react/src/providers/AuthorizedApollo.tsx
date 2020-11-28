import React from 'react';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { useAuth0 } from '@auth0/auth0-react';
import fetch from 'isomorphic-unfetch';

import introspectionResult from '../_generated/introspection-result';

const AuthorizedApolloProvider: React.FC = ({ children }) => {
  const { getAccessTokenSilently } = useAuth0();

  const cache = new InMemoryCache({ possibleTypes: introspectionResult.possibleTypes });

  const errorLink = onError(({ graphQLErrors, networkError, forward, operation }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path, originalError }) => {
        // TODO: sentry

        // TODO: token expired

        console.log(
          `[GraphQL Error]: Message: ${message}, Locations: ${locations}, path: ${path}, originalError: ${originalError}`,
          originalError,
        );
      });
    }

    if (networkError) {
      console.log(`[Network Error]: ${networkError}`, networkError);
    }

    return forward(operation);
  });

  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_API_SERVER,
    fetch,
    credentials: 'same-origin',
    includeExtensions: true,
  });

  const authLink = setContext(async () => {
    const token = await getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    });

    return {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
  });

  const apolloClient = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink, httpLink]),
    cache,
    connectToDevTools: true,
  });

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default AuthorizedApolloProvider;
