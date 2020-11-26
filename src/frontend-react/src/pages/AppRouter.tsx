import React, { lazy, Suspense, useContext, useEffect } from 'react';
import { Switch, Route, Router, Redirect } from 'react-router-dom';

import { useRouter } from '../hooks/router';

import UserListPage from './users';
import Welcome from './welcome';

const LoadingPage = () => <p>loading...</p>;

const AppRouter = () => {
  const { history } = useRouter();

  return (
    <Router history={history}>
      <Suspense fallback={<LoadingPage />}>
        <Switch>
          <Route path="/welcome" component={Welcome} />
          <Route path="/users" component={UserListPage} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
