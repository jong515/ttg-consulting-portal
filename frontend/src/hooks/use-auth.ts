import { useUser, useAuth } from '@clerk/react';

export function useAuthContext() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();

  return {
    user: user ?? null,
    isLoaded,
    isSignedIn: isSignedIn ?? false,
    getToken,
  };
}
