import { User, ShieldCheck, HelpCircle } from "lucide-react";

export interface NavItem {
  name: string;
  icon: typeof User;
  href: string;
}

export const NAV_ITEMS_USER_SETTINGS: NavItem[] = [
  {
    name: "User Profile",
    icon: User,
    href: "/dashboard/settings/user-profile",
  },
  {
    name: "Account Status",
    icon: ShieldCheck,
    href: "/dashboard/settings/account-status",
  },
  {
    name: "Help & Support",
    icon: HelpCircle,
    href: "/dashboard/settings/help-support",
  },
];

export const NAV_ITEMS_WORKSPACE_SETTINGS: NavItem[] = [
  { name: "General", icon: User, href: "/dashboard/workspace/general" },
  { name: "Members", icon: ShieldCheck, href: "/dashboard/workspace/members" },
  {
    name: "Invitation",
    icon: HelpCircle,
    href: "/dashboard/workspace/invitation",
  },
];

export const ProtectedPaths = [
  ...NAV_ITEMS_USER_SETTINGS.map((item) => item.href),
  ...NAV_ITEMS_WORKSPACE_SETTINGS.map((item) => item.href),
];
