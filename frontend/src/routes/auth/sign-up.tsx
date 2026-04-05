import { SignUp } from '@clerk/react';
import { createFileRoute, Link, Navigate } from '@tanstack/react-router';
import { getAuthMode } from '@/auth/env';

export const Route = createFileRoute('/auth/sign-up')({
  component: SignUpPage,
});

function SignUpPage() {
  if (getAuthMode() === 'mock') {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      <header className="border-b border-brand-border px-6 py-4">
        <Link to="/" className="text-sm text-brand-text-muted hover:text-brand-accent transition-colors">
          Back to home
        </Link>
      </header>
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <SignUp
          routing="hash"
          fallbackRedirectUrl="/dashboard"
          signInUrl="/auth/login"
        />
      </div>
    </div>
  );
}
