import { apiWrapper } from "@/lib/api/api-wrapper";
import { UpdateMemberRoleType } from "../types/member-type";

const memberApi = {
  getMemberList: async (workspaceId: string) => {
    const response = await apiWrapper.get(`/workspaces/${workspaceId}/members`);
    return response;
  },

  updateMemberRole: async (workspaceId: string, data: UpdateMemberRoleType) => {
    const response = await apiWrapper.patch(
      `/workspaces/${workspaceId}/members`,
      data,
    );
    return response;
  },

  removeMember: async (workspaceId: string) => {
    const response = await apiWrapper.delete(
      `/workspaces/${workspaceId}/members`,
    );
    return response;
  },
};

export { memberApi };
