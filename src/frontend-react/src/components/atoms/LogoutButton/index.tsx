import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton: React.FC = () => {
  const { logout } = useAuth0();

  return (
    <button
      className="mr-5 bg-gray-200 hover:bg-gray-300 border border-gray-400 text-black font-bold py-2 px-6 rounded-md"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
