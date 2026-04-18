import { Link, useRouterState } from '@tanstack/react-router';
import { LayoutDashboard, Library, LogOut, Settings } from 'lucide-react';
import { usePortalAuth } from '@/auth/auth-context';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const nav = [
  { to: '/dashboard' as const, label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/dashboard/resources' as const, label: 'Resources', icon: Library, end: false },
  { to: '/dashboard/settings' as const, label: 'Account Settings', icon: Settings, end: false },
];

export function ContentDashboardSidebar() {
  const { signOut } = usePortalAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-border bg-white">
      <div className="flex h-16 items-center gap-3 border-b border-border px-5">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#0B1B3A] text-sm font-semibold tracking-tight text-white">
          bg
        </div>
        <span className="truncate font-semibold text-[#0B1B3A]">beyondgrades</span>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 p-3" aria-label="Dashboard">
        {nav.map(({ to, label, icon: Icon, end }) => {
          const active = end
            ? pathname === to || pathname === `${to}/`
            : pathname === to || pathname.startsWith(`${to}/`);
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                active
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              )}
            >
              <Icon className="size-4 shrink-0 opacity-80" aria-hidden />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          onClick={() => void signOut()}
        >
          <LogOut className="size-4" aria-hidden />
          Logout
        </Button>
      </div>
    </aside>
  );
}
