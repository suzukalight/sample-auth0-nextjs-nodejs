import React from 'react';
import { Link } from 'react-router-dom';

import Loading from '../../components/atoms/Loading';

import { useAuth0User } from '../../hooks/auth0-user';

const Callback = () => {
  const { isLoading } = useAuth0User();

  if (isLoading) return <Loading />;

  return (
    <div className="w-full h-full p-8 flex justify-center align-middle flex-col">
      <div className="flex flex-row justify-center align-middle m-12">Redirecting your page...</div>
      <div className="flex flex-row justify-center align-middle">
        <Link to="/">Or click here to manually go to the home page</Link>
      </div>
    </div>
  );
};

export default Callback;
