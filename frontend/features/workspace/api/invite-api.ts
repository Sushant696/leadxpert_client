import { apiWrapper } from "@/lib/api/api-wrapper";
import { apiURLs } from "@/utils/apiUrls";

const inviteApi = {
  createInviteLink: async (workspaceId: string) => {
    return apiWrapper.post(apiURLs.WORKSPACE.invite.createLink(workspaceId));
  },

  createInviteByEmail: async (workspaceId: string, email: string) => {
    return apiWrapper.post(
      apiURLs.WORKSPACE.invite.createByEmail(workspaceId),
      { email },
    );
  },

  getActiveInvites: async (workspaceId: string) => {
    return apiWrapper.get(apiURLs.WORKSPACE.invite.getActive(workspaceId));
  },

  revokeInvite: async (workspaceId: string, inviteId: string) => {
    return apiWrapper.delete(
      apiURLs.WORKSPACE.invite.revoke(workspaceId, inviteId),
    );
  },
};
export { inviteApi };
