import React, { createContext, useMemo } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

type Me = {
  user: Record<string, string> | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  [key: string]: any;
};

const MeContext = createContext<Me>({ user: null, isAuthenticated: false, isLoading: false });

const MeProvider: React.FC = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const me = useMemo(() => {
    return {
      user,
      isAuthenticated,
      isLoading,
    };
  }, [user, isAuthenticated, isLoading]);

  return <MeContext.Provider value={me}>{children}</MeContext.Provider>;
};

export default MeProvider;
