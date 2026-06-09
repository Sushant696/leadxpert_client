import { useMutation, useQueryClient } from "@tanstack/react-query";

import { showToast } from "@/components/showToast";
import { createWorkspaceAction } from "../action/workspace-action";

const useCreateWorkspace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-workspace"],
    mutationFn: createWorkspaceAction,
    onSuccess: () => {
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
