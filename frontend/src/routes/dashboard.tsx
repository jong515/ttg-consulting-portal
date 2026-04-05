import { createFileRoute, Link, Navigate } from '@tanstack/react-router';
import { usePortalAuth } from '@/auth/auth-context';
import { Navbar } from '@/components/layout/navbar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useResourceProgress } from '@/hooks/use-resource-progress';
import { useResources } from '@/hooks/use-resources';
import { TOPIC_LABELS } from '@/lib/mock-data';

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
});

function DashboardPage() {
  const { isLoaded, isSignedIn, user, signOut } = usePortalAuth();
  const { resources, isLoading: resourcesLoading, error: resourcesError } = useResources();
  const { progress, isLoading: progressLoading, error: progressError } = useResourceProgress();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center text-brand-text-muted">
        Loading…
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/auth/login" replace />;
  }

  const progressById = new Map(progress.map((p) => [p.resourceId, p]));
  const loading = resourcesLoading || progressLoading;
  const error = resourcesError ?? progressError;

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <main className="mx-auto max-w-[1200px] px-6 py-10">
        <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-serif text-3xl font-semibold text-brand-text">Your resources</h1>
            <p className="text-brand-text-muted mt-2 text-sm">
              Signed in as {user?.email ?? user?.id}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" asChild>
              <Link to="/">Home</Link>
            </Button>
            <Button variant="outline" onClick={() => void signOut()}>
              Sign out
            </Button>
          </div>
        </header>

        {loading && (
          <p className="text-brand-text-muted text-sm">Loading resources…</p>
        )}

        {error && (
          <p className="text-destructive text-sm" role="alert">
            {error instanceof Error ? error.message : 'Something went wrong'}
          </p>
        )}

        {!loading && !error && (
          <ul className="grid gap-4 sm:grid-cols-2">
            {resources.map((resource) => {
              const p = progressById.get(resource.id);
              const topicLabel = TOPIC_LABELS[resource.topic];
              return (
                <li
                  key={resource.id}
                  className="rounded-xl border border-brand-border bg-white/80 p-5 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <h2 className="font-semibold text-brand-text leading-snug">{resource.title}</h2>
                    <Badge variant="secondary" className="shrink-0 capitalize">
                      {resource.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-brand-accent mb-2">{topicLabel}</p>
                  <p className="text-sm text-brand-text-muted line-clamp-3 mb-4">
                    {resource.description}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-brand-text-muted">
                    <span>{resource.duration}</span>
                    {p?.completed ? (
                      <span className="text-brand-accent font-medium">Completed</span>
                    ) : p?.lastAccessedAt ? (
                      <span>In progress</span>
                    ) : (
                      <span>Not started</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}
