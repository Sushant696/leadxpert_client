import { apiURLs } from "@/utils/apiUrls";
import { apiWrapper } from "@/lib/api/api-wrapper";
import { CreateWorkspacePayload } from "./workspace-types";

const workspaceApi = {
  createWorkspace: async (data: CreateWorkspacePayload) => {
    const response = await apiWrapper.post(apiURLs.WORKSPACE.createWorkspace, data);
    return response;
  }
}

export { workspaceApi };
