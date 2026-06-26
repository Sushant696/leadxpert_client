import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/components/showToast";
import { createLeadAction } from "../action/lead-action";
import { CreateLeadPayload } from "../types/lead-types";

const useCreateLead = (workspaceId: string, pipelineId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-lead", workspaceId, pipelineId],
    mutationFn: (data: CreateLeadPayload) =>
      createLeadAction(workspaceId, pipelineId, data),
    onSuccess: () => {
      showToast.success("Lead created successfully");
      queryClient.invalidateQueries({
        queryKey: ["leads", workspaceId, pipelineId],
      });
      queryClient.invalidateQueries({
        queryKey: ["pipeline", workspaceId, pipelineId],
      });
    },
    onError: (error: Error) => {
      showToast.error(error.message);
      console.error("Error creating lead:", error);
    },
  });
};

export default useCreateLead;
