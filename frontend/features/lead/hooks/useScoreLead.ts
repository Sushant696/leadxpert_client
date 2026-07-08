import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/components/showToast";
import { scoreLeadAction } from "../action/lead-action";

// Manually re-score a single lead. After the ML service writes the new score
// back to the lead, we invalidate the lead queries so the UI refetches the
// updated ml fields (no client-side merge of the score response needed).
const useScoreLead = (
  workspaceId: string,
  pipelineId: string,
  leadId: string,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["score-lead", leadId],
    mutationFn: () => scoreLeadAction(leadId),
    onSuccess: () => {
      showToast.success("Lead re-scored");
      queryClient.invalidateQueries({
        queryKey: ["leads", workspaceId, pipelineId],
      });
      queryClient.invalidateQueries({ queryKey: ["lead", leadId] });
      // Detail page (useGetLeadDetail) keys on ["lead-detail", leadId].
      queryClient.invalidateQueries({ queryKey: ["lead-detail", leadId] });
    },
    onError: (error: Error) => {
      showToast.error(error.message || "Failed to re-score lead");
      console.error("Error scoring lead:", error);
    },
  });
};

export default useScoreLead;
