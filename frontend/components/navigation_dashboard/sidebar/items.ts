import {
  LayoutDashboardIcon,
  UserPlus,
  Tag,
  CheckSquare,
} from 'lucide-react';

export const NAV_ITEMS = [
  { label: 'Home', icon: LayoutDashboardIcon, href: '/dashboard' },
  { label: 'Deals', icon: Tag, href: '/dashboard/deals' },
  { label: 'Tasks', icon: CheckSquare, href: '/dashboard/tasks' },
];

export const ProtectedPaths = [
  ...NAV_ITEMS.map(item => item.href),
];

