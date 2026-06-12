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

export const canAccessRoute = (
  route: string,
  userRole?: string
): boolean => {
  if (!userRole) return false;

  const allowedRoles = WORKSPACE_ROUTE_PERMISSIONS[
    route as keyof typeof WORKSPACE_ROUTE_PERMISSIONS
  ];

  return allowedRoles?.includes(userRole as any) ?? false;
};
