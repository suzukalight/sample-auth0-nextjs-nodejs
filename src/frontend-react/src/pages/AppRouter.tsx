import React, { Suspense } from 'react';
import { Switch, Route, Router } from 'react-router-dom';

import { useRouter } from '../hooks/router';

import Loading from '../components/atoms/Loading';
import RootPage from './account';
import Callback from './callback';
import Welcome from './welcome';
import UserListPage from './users';
import LoginPage from './login';

const AppRouter = () => {
  const { history } = useRouter();

  return (
    <Router history={history}>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/callback" component={Callback} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/users" component={UserListPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/" component={RootPage} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
