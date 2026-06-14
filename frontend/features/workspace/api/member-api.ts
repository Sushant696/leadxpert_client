import { apiWrapper } from "@/lib/api/api-wrapper";
import { UpdateMemberRoleType } from "../types/member-type";
import { apiURLs } from "@/utils/apiUrls";

const memberApi = {
  getMemberList: async (workspaceId: string) => {
    const response = await apiWrapper.get(apiURLs.WORKSPACE.members.getAll(workspaceId));
    return response;
  },

  updateMemberRole: async (workspaceId: string, data: UpdateMemberRoleType) => {
    const response = await apiWrapper.patch(
      apiURLs.WORKSPACE.members.updateRole(workspaceId),
      data,
    );
    return response;
  },

  removeMember: async (workspaceId: string, data: UpdateMemberRoleType) => {
    const response = await apiWrapper.delete(
      apiURLs.WORKSPACE.members.remove(workspaceId),
      { data },
    );
    return response;
  },
};

export { memberApi };
