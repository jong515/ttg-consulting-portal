import { LayoutDashboard, Library, Settings } from 'lucide-react';

export const dashboardNav = [
  { to: '/dashboard' as const, label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/dashboard/resources' as const, label: 'Resources', icon: Library, end: false },
  { to: '/dashboard/settings' as const, label: 'Account Settings', icon: Settings, end: false },
];

