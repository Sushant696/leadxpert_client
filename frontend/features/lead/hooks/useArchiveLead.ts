import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/components/showToast";
import { archiveLeadAction } from "../action/lead-action";

const useArchiveLead = (
  workspaceId: string,
  pipelineId: string,
  leadId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["archive-lead", leadId],
    mutationFn: () => archiveLeadAction(workspaceId, pipelineId, leadId),
    onSuccess: () => {
      showToast.success("Lead archived successfully");
      queryClient.invalidateQueries({
        queryKey: ["leads", workspaceId, pipelineId],
      });
      queryClient.invalidateQueries({ queryKey: ["lead", leadId] });
    },
    onError: (error: Error) => {
      showToast.error(error.message);
      console.error("Error archiving lead:", error);
    },
  });
};

export default useArchiveLead;
