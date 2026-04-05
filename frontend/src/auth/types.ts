export interface PortalUser {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
}

export interface PortalAuthContextValue {
  isLoaded: boolean;
  isSignedIn: boolean;
  user: PortalUser | null;
  getToken: () => Promise<string | null>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}
