import React, { Suspense } from 'react';
import { Switch, Route, Router } from 'react-router-dom';

import { useRouter } from '../hooks/router';

import RootPage from '.';
import Callback from './callback';
import Welcome from './welcome';
import UserListPage from './users';

const LoadingPage = () => <p>loading...</p>;

const AppRouter = () => {
  const { history } = useRouter();

  return (
    <Router history={history}>
      <Suspense fallback={<LoadingPage />}>
        <Switch>
          <Route path="/callback" component={Callback} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/users" component={UserListPage} />
          <Route path="/" component={RootPage} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
