import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0User } from '../../../hooks/auth0-user';

import LoginButton from '../../atoms/LoginButton';
import LogoutButton from '../../atoms/LogoutButton';

type HeaderPresenterProps = {
  isAuthenticated: boolean;
};
const HeaderPresenter: React.FC<HeaderPresenterProps> = ({ isAuthenticated }) => (
  <header className="text-gray-100 bg-gray-900 body-font shadow w-full">
    <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <nav className="flex lg:w-1/3 flex-wrap items-center text-base md:ml-auto">
        {isAuthenticated && (
          <>
            <Link
              to="/account"
              className="mr-5 hover:text-gray-900 cursor-pointer border-b border-transparent hover:border-indigo-600"
            >
              Account
            </Link>
            <Link
              to="/users"
              className="mr-5 hover:text-gray-900 cursor-pointer border-b border-transparent hover:border-indigo-600"
            >
              Users
            </Link>
          </>
        )}
      </nav>
      <a className="flex order-first lg:order-none lg:w-1/3 title-font font-medium items-center lg:items-center lg:justify-center mb-4 md:mb-0">
        <Link to="/">
          <span className="ml-3 text-xl">sample-auth0-react-nodejs</span>
        </Link>
      </a>
      <div className="lg:w-1/3 inline-flex lg:justify-end ml-5 lg:ml-0">
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </div>
    </div>
  </header>
);

const Header: React.FC = () => {
  const { user } = useAuth0User();

  return <HeaderPresenter isAuthenticated={!!user} />;
};

export default Header;
