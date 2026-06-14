import { RESOURCE_BASED_ROLES } from "@/types/user";
import { User } from "@/features/user/user-types";

export interface UpdateMemberRoleType {
  role: RESOURCE_BASED_ROLES,
  userId: string
}

export interface WorkspaceMember extends User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

export interface Member {
  membershipId: string;
  role: RESOURCE_BASED_ROLES;
  joinedAt: string;
  user: WorkspaceMember;
}

export interface WorkspaceMembersData {
  members: Member[];
}

export interface GetWorkspaceMembersResponse {
  status: number;
  message: string;
  success: boolean;
  data: WorkspaceMembersData;
}

