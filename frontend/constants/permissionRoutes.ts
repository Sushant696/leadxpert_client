import { NAV_ITEMS_USER_SETTINGS } from '@/components/navigation_dashboard/sub-sidebar/items';
import { RESOURCE_BASED_ROLES } from '@/types/user';

export const WORKSPACE_ROUTE_PERMISSIONS = {
  '/dashboard/workspace/general': [
    RESOURCE_BASED_ROLES.SUPER_ADMIN,
    RESOURCE_BASED_ROLES.ADMIN,
  ],
  '/dashboard/workspace/members': [
    RESOURCE_BASED_ROLES.SUPER_ADMIN,
    RESOURCE_BASED_ROLES.ADMIN,
    RESOURCE_BASED_ROLES.AGENT,
  ],
  '/dashboard/workspace/invitation': [
    RESOURCE_BASED_ROLES.SUPER_ADMIN,
    RESOURCE_BASED_ROLES.ADMIN,
  ],
  '/dashboard/workspace/account-privacy': [
    RESOURCE_BASED_ROLES.SUPER_ADMIN,
    RESOURCE_BASED_ROLES.ADMIN,
  ],
} as const;

const USER_SETTINGS_ROUTES = NAV_ITEMS_USER_SETTINGS.map(
  item => item.href
);

export const canAccessRoute = (
  route: string,
  workspaceRole?: string
): boolean => {

  // user settings -> always accessible
  if (USER_SETTINGS_ROUTES.includes(route)) {
    return true;
  }

  if (!workspaceRole) return false;

  const allowedRoles =
    WORKSPACE_ROUTE_PERMISSIONS[
    route as keyof typeof WORKSPACE_ROUTE_PERMISSIONS
    ];

  return allowedRoles?.includes(workspaceRole as any) ?? false;
};
