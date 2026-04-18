import { createFileRoute } from '@tanstack/react-router';
import { usePortalAuth } from '@/auth/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const Route = createFileRoute('/dashboard/settings')({
  component: DashboardSettingsPage,
});

function DashboardSettingsPage() {
  const { user } = usePortalAuth();

  return (
    <main className="flex-1 px-6 py-8 md:px-10 md:py-10">
      <div className="mx-auto max-w-3xl space-y-8">
        <h1 className="font-serif text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Account settings
        </h1>
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Details from your signed-in account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <span className="font-medium text-foreground">Email: </span>
              <span className="text-muted-foreground">{user?.email ?? '—'}</span>
            </p>
            <p>
              <span className="font-medium text-foreground">User ID: </span>
              <span className="break-all text-muted-foreground">{user?.id ?? '—'}</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
