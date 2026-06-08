export type UserRole = 'ADMIN' | 'USER'
export type RESOURCE_BASED_ROLES = "SUPER_ADMIN" | "ADMIN" | "MEMBER";

export const RESOURCE_BASED_ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  MEMBER: "MEMBER"
} as const

export const UserRoles = {
  ADMIN: "ADMIN",
  USER: "USER"
} as const

