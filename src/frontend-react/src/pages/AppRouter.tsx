import React from 'react';
import { Switch, Route } from 'react-router-dom';

import RootPage from './';
import Callback from './callback';
import Welcome from './welcome';
import UserListPage from './users';
import LoginPage from './login';
import AccountPage from './account';

const AppRouter = () => (
  <Switch>
    <Route path="/callback" component={Callback} />
    <Route path="/account" component={AccountPage} />
    <Route path="/welcome" component={Welcome} />
    <Route path="/users" component={UserListPage} />
    <Route path="/login" component={LoginPage} />
    <Route exact path="/" component={RootPage} />
    <Route path="/" component={RootPage} />
  </Switch>
);

export default AppRouter;
