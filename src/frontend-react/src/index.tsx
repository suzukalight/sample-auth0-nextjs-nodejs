import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import Root from './pages/Root';

import reportWebVitals from './reportWebVitals';
import { client } from './libraries/apollo-client';

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Root />
    </Router>
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
