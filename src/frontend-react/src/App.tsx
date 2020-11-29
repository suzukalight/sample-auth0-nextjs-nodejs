import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppRouter from './pages/AppRouter';
import Loading from './components/atoms/Loading';

import './styles/globals.compiled.css';

import Auth0Provider from './providers/Auth0';
import AuthorizedApolloProvider from './providers/AuthorizedApollo';
import MeProvider from './providers/Me';

const App: React.FC = () => (
  <BrowserRouter>
    <Auth0Provider>
      <AuthorizedApolloProvider>
        <MeProvider>
          <Suspense fallback={<Loading />}>
            <AppRouter />
          </Suspense>
        </MeProvider>
      </AuthorizedApolloProvider>
    </Auth0Provider>
  </BrowserRouter>
);

export default App;
