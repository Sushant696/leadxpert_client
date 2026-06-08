import {
  LayoutDashboardIcon,
  UserPlus,
  Users,
  Tag,
  CheckSquare,
  Sparkles,
  PhoneCall,
  Calendar,
  BarChart3,
} from 'lucide-react';

export const NAV_ITEMS = [
  { label: 'Home', icon: LayoutDashboardIcon, href: '/dashboard' },
  { label: 'Leads', icon: UserPlus, href: '/dashboard/leads' },
  { label: 'Clients', icon: Users, href: '/dashboard/clients' },
  { label: 'Deals', icon: Tag, href: '/dashboard/deals' },
  { label: 'Tasks', icon: CheckSquare, href: '/dashboard/tasks' },
  { label: 'Assistant', icon: Sparkles, href: '/dashboard/assistant', isAi: true },
  { label: 'Follow-ups', icon: PhoneCall, href: '/dashboard/follow-ups' },
  { label: 'Calendar', icon: Calendar, href: '/dashboard/calendar' },
  { label: 'Analytics', icon: BarChart3, href: '/dashboard/analytics' },
];

const WORKSPACE_NAME_METADATA_KEY = {
  personal: 'Personal',
  leads: 'Leads',
  clients: 'Clients',
};
export const DUMMY_WORKSPACE_ITEMS = [
  { label: 'Personal', icon: LayoutDashboardIcon, href: `/dashboard/${WORKSPACE_NAME_METADATA_KEY.personal}` },
  { label: 'Digi Tech', icon: UserPlus, href: `/dashboard/${WORKSPACE_NAME_METADATA_KEY.leads}` },
  { label: 'Leap Frog', icon: Users, href: `/dashboard/${WORKSPACE_NAME_METADATA_KEY.clients}` },
];

export const ProtectedPaths = [
  ...NAV_ITEMS.map(item => item.href),
  ...DUMMY_WORKSPACE_ITEMS.map(item => item.href),
];

/*
  export const WORKSPACE_ITEMS_FROM_BACKEND = [
  {
    id: "ws_personal",
    name: "Personal",
    slug: WORKSPACE_NAME_METADATA_KEY.personal,
    iconUrl: "https://cdn.leadxpert.app/workspaces/personal.png",
    type: "SYSTEM",
  },
  {
    id: "ws_leads",
    name: "Digi Tech",
    slug: WORKSPACE_NAME_METADATA_KEY.leads,
    iconUrl: "https://cdn.leadxpert.app/workspaces/leads.png",
    type: "ORGANIZATION",
  },
  {
    id: "ws_clients",
    name: "Leap Frog",
    slug: WORKSPACE_NAME_METADATA_KEY.clients,
    iconUrl: "https://cdn.leadxpert.app/workspaces/clients.png",
    type: "ORGANIZATION",
  },
];
 * */
