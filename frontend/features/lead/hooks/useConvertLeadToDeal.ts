import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/components/showToast";
import { convertLeadToDealAction } from "../action/lead-action";

const useConvertLeadToDeal = (
  workspaceId: string,
  pipelineId: string,
  leadId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["convert-lead", leadId],
    mutationFn: () => convertLeadToDealAction(workspaceId, pipelineId, leadId),
    onSuccess: (response) => {
      showToast.success("Lead converted to deal successfully");
      queryClient.invalidateQueries({
        queryKey: ["leads", workspaceId, pipelineId],
      });
      queryClient.invalidateQueries({ queryKey: ["lead", leadId] });
      queryClient.invalidateQueries({ queryKey: ["deals", workspaceId] });
    },
    onError: (error: Error) => {
      showToast.error(error.message);
      console.error("Error converting lead:", error);
    },
  });
};

export default useConvertLeadToDeal;
