import { RESOURCE_BASED_ROLES } from "@/types/user";

export interface UpdateMemberRoleType {
  role: RESOURCE_BASED_ROLES,
  userId: string
}
