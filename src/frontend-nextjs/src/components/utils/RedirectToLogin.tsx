import Router from 'next/router';
import React, { Component } from 'react';

import createLoginUrl from '../../libraries/url-helper';

export default class RedirectToLogin extends Component {
  componentDidMount(): void {
    window.location.assign(createLoginUrl(Router.pathname));
  }

  render(): React.ReactElement {
    return <div>Signing you in...</div>;
  }
}
