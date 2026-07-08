import { useQuery } from "@tanstack/react-query";
import { getPriorityMismatchAction } from "../action/insights-action";

const useGetPriorityMismatch = (
  workspaceId: string,
  pipelineId?: string,
  enabled = true,
) => {
  return useQuery({
    queryKey: ["insights", "priority-mismatch", workspaceId, pipelineId ?? "all"],
    queryFn: () => getPriorityMismatchAction(workspaceId, pipelineId),
    enabled: !!workspaceId && enabled,
    retry: 1,
  });
};

export default useGetPriorityMismatch;
