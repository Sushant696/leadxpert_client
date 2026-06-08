import {
  LayoutDashboardIcon,
  UserPlus,
  Users,
  Tag,
  CheckSquare,
  Sparkles,
  PhoneCall,
} from 'lucide-react';

export const NAV_ITEMS = [
  { label: 'Home', icon: LayoutDashboardIcon, href: '/dashboard' },
  { label: 'Leads', icon: UserPlus, href: '/dashboard/leads' },
  { label: 'Clients', icon: Users, href: '/dashboard/clients' },
  { label: 'Deals', icon: Tag, href: '/dashboard/deals' },
  { label: 'Tasks', icon: CheckSquare, href: '/dashboard/tasks' },
  { label: 'Assistant', icon: Sparkles, href: '/dashboard/assistant', isAi: true },
  { label: 'Follow-ups', icon: PhoneCall, href: '/dashboard/follow-ups' },
];

export const ProtectedPaths = [
  ...NAV_ITEMS.map(item => item.href),
];

