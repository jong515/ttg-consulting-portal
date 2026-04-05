import { SignIn } from '@clerk/react';
import { createFileRoute, Link, Navigate, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { usePortalAuth } from '@/auth/auth-context';
import { getAuthMode } from '@/auth/env';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/auth/login')({
  component: LoginPage,
});

function LoginPage() {
  const mode = getAuthMode();
  if (mode === 'mock') {
    return <MockLoginView />;
  }
  return <ClerkSignInView />;
}

function MockLoginView() {
  const { isSignedIn, signIn } = usePortalAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate({ to: '/dashboard', replace: true });
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      <header className="border-b border-brand-border px-6 py-4">
        <Link to="/" className="text-sm text-brand-text-muted hover:text-brand-accent transition-colors">
          Back to home
        </Link>
      </header>
      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-20">
        <div className="w-full max-w-md rounded-2xl border border-brand-border bg-white/80 p-8 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] font-medium text-brand-accent mb-3">
            Demo mode
          </p>
          <h1 className="font-serif text-2xl font-semibold text-brand-text mb-2">Sign in</h1>
          <p className="text-sm text-brand-text-muted mb-8">
            This is a local prototype only. No real credentials or Clerk session.
          </p>
          <Button
            type="button"
            className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white h-11"
            onClick={() => void signIn()}
          >
            Continue as test parent
          </Button>
        </div>
      </div>
    </div>
  );
}

function ClerkSignInView() {
  const { isLoaded, isSignedIn } = usePortalAuth();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center text-brand-text-muted">
        Loading…
      </div>
    );
  }

  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      <header className="border-b border-brand-border px-6 py-4">
        <Link to="/" className="text-sm text-brand-text-muted hover:text-brand-accent transition-colors">
          Back to home
        </Link>
      </header>
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <SignIn
          routing="hash"
          fallbackRedirectUrl="/dashboard"
          signUpUrl="/auth/sign-up"
        />
      </div>
    </div>
  );
}
