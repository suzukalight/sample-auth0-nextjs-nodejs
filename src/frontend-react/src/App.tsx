import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AuthorizedApolloProvider from './providers/AuthorizedApollo';
import Auth0Provider from './providers/Auth0';
import AppRouter from './pages/AppRouter';

import './styles/globals.compiled.css';

const App: React.FC = () => (
  <Auth0Provider>
    <AuthorizedApolloProvider>
      <Router>
        <AppRouter />
      </Router>
    </AuthorizedApolloProvider>
  </Auth0Provider>
);

export default App;
