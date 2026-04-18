import type { ReactNode } from 'react';
import { ContentDashboardSidebar } from '@/components/dashboard/content-dashboard-sidebar';

export function ContentDashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-white text-foreground">
      <ContentDashboardSidebar />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col overflow-auto bg-white">
        {children}
      </div>
    </div>
  );
}
