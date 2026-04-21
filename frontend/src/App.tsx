import { ClerkProvider } from '@clerk/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { ClerkAuthBridge } from '@/auth/clerk-auth-bridge';
import { getAuthMode, usesDemoAuthProvider } from '@/auth/env';
import { MockAuthProvider } from '@/auth/mock-auth-provider';
import { queryClient } from '@/lib/query-client';
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function getClerkPublishableKey(): string {
  const key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  if (!key) {
    throw new Error(
      'VITE_CLERK_PUBLISHABLE_KEY is not configured. ' +
        'Add it to .env.local / Vercel env, or set VITE_AUTH_MODE=public for a preview without Clerk ' +
        '(or VITE_AUTH_MODE=mock for local demo only).',
    );
  }
  return key;
}

export default function App() {
  const mode = getAuthMode();

  const inner = (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );

  if (usesDemoAuthProvider(mode)) {
    return <MockAuthProvider>{inner}</MockAuthProvider>;
  }

  return (
    <ClerkProvider publishableKey={getClerkPublishableKey()}>
      <ClerkAuthBridge>{inner}</ClerkAuthBridge>
    </ClerkProvider>
  );
}
