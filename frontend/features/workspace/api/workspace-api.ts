import { apiURLs } from "@/utils/apiUrls";
import { apiWrapper } from "@/lib/api/api-wrapper";
import { CreateWorkspacePayload } from "../workspace-types";

const workspaceApi = {
  createWorkspace: async (data: CreateWorkspacePayload) => {
    return await apiWrapper.post(apiURLs.WORKSPACE.create, data);
  },
  getUserWorkspaces: async () => {
    return await apiWrapper.get(apiURLs.WORKSPACE.getAll);
  },
  updateById: async (workspaceId: string) => {
    return await apiWrapper.get(apiURLs.WORKSPACE.updateById(`${workspaceId}`));
  },
  deleteById: async (workspaceId: string) => {
    return await apiWrapper.get(apiURLs.WORKSPACE.deleteById(`${workspaceId}`));
  },
};

export { workspaceApi };
