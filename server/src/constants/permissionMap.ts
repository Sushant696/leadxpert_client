export const RolePermissions = {
  super_admin: ["*"],
  admin: [
    "lead:create",
    "lead:update",
    "lead:assign",
    "project:create",
  ],
  employee: [
    "lead:view",
    "lead:update_own",
  ],
};

