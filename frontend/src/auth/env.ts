export type AuthMode = 'clerk' | 'mock' | 'public';

/**
 * Demo-style auth: no Clerk, uses {@link MockAuthProvider} (local `mock` or hosted `public`).
 */
export function usesDemoAuthProvider(mode: AuthMode): mode is 'mock' | 'public' {
  return mode === 'mock' || mode === 'public';
}

/**
 * Resolves auth mode from env.
 * - `mock` — local dev demo only; rejected in production builds.
 * - `public` — same demo auth as mock, allowed in production (e.g. Vercel preview without Clerk).
 */
export function getAuthMode(): AuthMode {
  const raw = import.meta.env.VITE_AUTH_MODE?.toLowerCase();
  if (raw === 'public') {
    return 'public';
  }
  if (raw === 'mock') {
    if (import.meta.env.PROD) {
      throw new Error(
        'VITE_AUTH_MODE=mock is not allowed in production builds. ' +
          'Use VITE_AUTH_MODE=public for a hosted preview without Clerk, or omit for Clerk.',
      );
    }
    return 'mock';
  }
  return 'clerk';
}

/** Use static mock API payloads (no backend) in dev demo or when API URL is unset. */
export function shouldUseMockApiData(): boolean {
  const raw = import.meta.env.VITE_AUTH_MODE?.toLowerCase();
  if (raw === 'mock' || raw === 'public') return true;
  return Boolean(import.meta.env.DEV && !import.meta.env.VITE_API_BASE_URL);
}
