import { useMutation, useQueryClient } from "@tanstack/react-query";

import { showToast } from "@/components/showToast";
import useWorkspaceStore from "@/store/workspace-store";
import { createWorkspaceAction } from "../action/workspace-action";

const useCreateWorkspace = () => {
  const queryClient = useQueryClient();
  const { setWorkspace } = useWorkspaceStore();
  return useMutation({
    mutationKey: ["create-workspace"],
    mutationFn: createWorkspaceAction,
    onSuccess: (data) => {
      if (data?.workspace) {
        setWorkspace(data.workspace);
      }
      showToast.success("Workspace created successfully");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
    onError: (error: any) => {
      showToast.error(error.message);
      console.error("Error creating workspace:", error);
    },
  });
};

export { useCreateWorkspace };
