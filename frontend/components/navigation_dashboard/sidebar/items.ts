import {
  LayoutDashboardIcon,
  UserPlus,
  Tag,
  CheckSquare,
  LineChart,
} from 'lucide-react';

export const NAV_ITEMS = [
  { label: 'Home', icon: LayoutDashboardIcon, href: '/dashboard' },
  { label: 'Deals', icon: Tag, href: '/dashboard/deals' },
  { label: 'Tasks', icon: CheckSquare, href: '/dashboard/tasks' },
];

// Rendered only for the workspace's super admin — see mainSidebar.tsx.
// Lives at the pre-existing /dashboard/analytics route (previously an
// unlinked stub) rather than a new path.
export const SUPER_ADMIN_NAV_ITEMS = [
  { label: 'Analytics', icon: LineChart, href: '/dashboard/analytics' },
];

export const ProtectedPaths = [
  ...NAV_ITEMS.map(item => item.href),
];

