import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { PortalAuthContext } from './auth-context';
import type { PortalAuthContextValue, PortalTier, PortalUser } from './types';

const MOCK_USER: PortalUser = {
  id: 'user-mock-demo',
  email: 'parent@example.com',
  firstName: 'Demo',
  lastName: 'Parent',
};

export function MockAuthProvider({ children }: { children: ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [tier, setTier] = useState<PortalTier>('free');
  const devBearerToken = import.meta.env.VITE_DEV_BEARER_TOKEN ?? null;

  const signIn = useCallback(async (nextTier: PortalTier = 'free') => {
    setTier(nextTier);
    setIsSignedIn(true);
  }, []);

  const signOut = useCallback(async () => {
    setIsSignedIn(false);
    setTier('free');
  }, []);

  const value = useMemo<PortalAuthContextValue>(
    () => ({
      isLoaded: true,
      isSignedIn,
      user: isSignedIn ? MOCK_USER : null,
      tier: isSignedIn ? tier : 'free',
      getToken: async () => (isSignedIn && tier === 'paid' ? devBearerToken : null),
      signIn,
      signOut,
    }),
    [devBearerToken, isSignedIn, signIn, signOut, tier],
  );

  return <PortalAuthContext.Provider value={value}>{children}</PortalAuthContext.Provider>;
}
