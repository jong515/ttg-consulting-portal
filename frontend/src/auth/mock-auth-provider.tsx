import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { PortalAuthContext } from './auth-context';
import type { PortalAuthContextValue, PortalUser } from './types';

const MOCK_USER: PortalUser = {
  id: 'user-mock-demo',
  email: 'parent@example.com',
  firstName: 'Demo',
  lastName: 'Parent',
};

export function MockAuthProvider({ children }: { children: ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const signIn = useCallback(async () => {
    setIsSignedIn(true);
  }, []);

  const signOut = useCallback(async () => {
    setIsSignedIn(false);
  }, []);

  const value = useMemo<PortalAuthContextValue>(
    () => ({
      isLoaded: true,
      isSignedIn,
      user: isSignedIn ? MOCK_USER : null,
      getToken: async () => null,
      signIn,
      signOut,
    }),
    [isSignedIn, signIn, signOut],
  );

  return <PortalAuthContext.Provider value={value}>{children}</PortalAuthContext.Provider>;
}
