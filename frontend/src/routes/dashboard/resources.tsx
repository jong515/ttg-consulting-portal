import { createFileRoute, Link } from '@tanstack/react-router';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useResourceProgress } from '@/hooks/use-resource-progress';
import { useResources } from '@/hooks/use-resources';
import { TOPIC_LABELS } from '@/lib/mock-data';

export const Route = createFileRoute('/dashboard/resources')({
  component: DashboardResourcesPage,
});

function DashboardResourcesPage() {
  const { resources, isLoading: resourcesLoading, error: resourcesError } = useResources();
  const { progress, isLoading: progressLoading, error: progressError } = useResourceProgress();

  const progressById = new Map(progress.map((p) => [p.resourceId, p]));
  const loading = resourcesLoading || progressLoading;
  const error = resourcesError ?? progressError;

  return (
    <main className="flex-1 px-6 py-8 md:px-10 md:py-10">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-serif text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Resources
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Browse consulting materials and track your progress.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/">Home</Link>
          </Button>
        </header>

        {loading && <p className="text-sm text-muted-foreground">Loading resources…</p>}

        {error && (
          <p className="text-sm text-destructive" role="alert">
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
                  className="rounded-xl border border-border bg-card p-5 shadow-sm"
                >
                  <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                    <h2 className="font-semibold leading-snug text-foreground">{resource.title}</h2>
                    <Badge variant="secondary" className="shrink-0 capitalize">
                      {resource.type}
                    </Badge>
                  </div>
                  <p className="mb-2 text-xs text-primary">{topicLabel}</p>
                  <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                    {resource.description}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                    <span>{resource.duration}</span>
                    {p?.completed ? (
                      <span className="font-medium text-primary">Completed</span>
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
      </div>
    </main>
  );
}
