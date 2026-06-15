import { apiURLs } from "@/utils/apiUrls";
import { apiWrapper } from "@/lib/api/api-wrapper";
import { CreateWorkspacePayload, updateWorkspacePayload } from "../workspace-types";

const workspaceApi = {
  createWorkspace: async (data: CreateWorkspacePayload) => {
    return await apiWrapper.post(apiURLs.WORKSPACE.create, data);
  },
  getUserWorkspaces: async () => {
    return await apiWrapper.get(apiURLs.WORKSPACE.getAll);
  },
  updateWorkspace: async (workspaceId: string, data: updateWorkspacePayload) => {
    return await apiWrapper.patch(apiURLs.WORKSPACE.updateById(`${workspaceId}`), data);
  },
  deleteById: async (workspaceId: string) => {
    return await apiWrapper.delete(apiURLs.WORKSPACE.deleteById(`${workspaceId}`));
  },
};

export { workspaceApi };
