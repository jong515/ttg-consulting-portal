export type AuthMode = 'clerk' | 'mock';

/**
 * Resolves auth mode from env. `mock` is rejected in production builds.
 */
export function getAuthMode(): AuthMode {
  const raw = import.meta.env.VITE_AUTH_MODE?.toLowerCase();
  if (raw === 'mock') {
    if (import.meta.env.PROD) {
      throw new Error(
        'VITE_AUTH_MODE=mock is not allowed in production builds. Use clerk (default) for deployment.',
      );
    }
    return 'mock';
  }
  return 'clerk';
}

/** Use static mock API payloads (no backend) in dev demo or when API URL is unset. */
export function shouldUseMockApiData(): boolean {
  const raw = import.meta.env.VITE_AUTH_MODE?.toLowerCase();
  if (raw === 'mock') return true;
  return Boolean(import.meta.env.DEV && !import.meta.env.VITE_API_BASE_URL);
}
