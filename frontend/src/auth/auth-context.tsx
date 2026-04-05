import { createContext, useContext } from 'react';
import type { PortalAuthContextValue } from './types';

export const PortalAuthContext = createContext<PortalAuthContextValue | null>(null);

export function usePortalAuth(): PortalAuthContextValue {
  const ctx = useContext(PortalAuthContext);
  if (!ctx) {
    throw new Error('usePortalAuth must be used within a portal auth provider');
  }
  return ctx;
}
