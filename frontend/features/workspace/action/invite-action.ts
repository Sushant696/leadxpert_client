import { inviteApi } from "../api/invite-api";

export async function getInviteLinkAction(workspaceId: string) {
  const response = await inviteApi.createInviteLink(workspaceId);
  if (!response.success) {
    throw new Error(
      response?.message ||
      "Failed to created invite link, please try again later",
    );
  }
  return response.data;
}

export async function sendInviteByEmailAction(
  workspaceId: string,
  email: string,
) {
  const response = await inviteApi.createInviteByEmail(workspaceId, email);
  if (!response.success) {
    throw new Error(
      response?.message ||
      "Failed to send invite email, please try again later",
    );
  }
  return response.data;
}

export async function getActiveInvitesAction(workspaceId: string) {
  const response = await inviteApi.getActiveInvites(workspaceId);
  if (!response.success) {
    throw new Error(
      response?.message ||
      "Failed to fetch invites, please try again later",
    );
  }
  return response.data;
}

export async function revokeInviteAction(
  workspaceId: string,
  inviteId: string,
) {
  const response = await inviteApi.revokeInvite(workspaceId, inviteId);
  if (!response.success) {
    throw new Error(
      response?.message ||
      "Failed to revoke invite, please try again later",
    );
  }
  return response.data;
}
