import { useMutation, useQueryClient } from "@tanstack/react-query";

import { showToast } from "@/components/showToast";
import { updateWorkspacePayload } from "../workspace-types";
import { updateWorkspaceAction } from "../action/workspace-action";
import useWorkspaceStore from "@/store/workspace-store";

interface UpdateWorkspaceParams {
  workspaceId: string;
  data: updateWorkspacePayload;
}

const useUpdateWorkspace = () => {
  const queryClient = useQueryClient();
  const { setWorkspace } = useWorkspaceStore()
  return useMutation({
    mutationKey: ["update-workspace"],
    mutationFn: ({ workspaceId, data }: UpdateWorkspaceParams) => updateWorkspaceAction(workspaceId, data),
    onSuccess: (data) => {
      if (data?.data?.workspace) {
        setWorkspace(data.data.workspace);
      }
      showToast.success(data.message || "Workspace updated successfully");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
    onError: (error: any) => {
      showToast.error(error.message);
      console.error("Error creating workspace:", error);
    },
  });
};

export { useUpdateWorkspace };
