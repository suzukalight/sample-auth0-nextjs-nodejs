import React from 'react';

import { useFetchUser } from '../hooks/useUser';

export default function Home(): React.ReactElement {
  const { user, loading } = useFetchUser();

  return (
    <div>
      <h1>Next.js and Auth0 Example</h1>

      {loading && <p>Loading login info...</p>}

      {!loading && !user && (
        <>
          <p>
            To test the login click in <a href="/api/login">Login</a>
          </p>
          <p>
            Once you have logged in you should be able to click in <i>Profile</i> and{' '}
            <a href="/api/logout">Logout</a>
          </p>
        </>
      )}

      {user && (
        <>
          <h4>Rendered user info on the client</h4>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}
    </div>
  );
}
