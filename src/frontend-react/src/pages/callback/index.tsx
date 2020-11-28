import React from 'react';
import { Redirect } from 'react-router-dom';
// import { useRouter } from '../../hooks/router';

const Callback = () => {
  // const { query } = useRouter();

  return <Redirect to="/users" />;
};

export default Callback;
