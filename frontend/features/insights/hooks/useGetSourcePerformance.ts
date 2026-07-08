import { useQuery } from "@tanstack/react-query";
import { getSourcePerformanceAction } from "../action/insights-action";

const useGetSourcePerformance = (
  workspaceId: string,
  pipelineId?: string,
  enabled = true,
) => {
  return useQuery({
    queryKey: ["insights", "source-performance", workspaceId, pipelineId ?? "all"],
    queryFn: () => getSourcePerformanceAction(workspaceId, pipelineId),
    enabled: !!workspaceId && enabled,
    retry: 1,
  });
};

export default useGetSourcePerformance;
