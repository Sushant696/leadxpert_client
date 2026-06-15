"use server";

import { memberApi } from "../api/member-api";
import { UpdateMemberRoleType } from "../types/member-type";

export async function getAllWorkspaceMembersAction(workspaceId: string) {
  const response = await memberApi.getMemberList(workspaceId);
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch workspace members");
  }
  return response.data;
}

export async function updateRoleAction(
  workspaceId: string,
  data: UpdateMemberRoleType,
) {
  const response = await memberApi.updateMemberRole(workspaceId, data);
  if (!response.success) {
    throw new Error(
      response.message ||
      "Failed to update member role, please try again later",
    );
  }
  return response.data;
}

export async function removeMemberFromWorkspaceAction(workspaceId: string, userId: string) {
  const response = await memberApi.removeMember(workspaceId, userId);
  if (!response.success) {
    throw new Error(
      response.message || "Failed to remove member, please try again later",
    );
  }
  return response.data;
}
