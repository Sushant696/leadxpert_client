import { useQuery } from "@tanstack/react-query";
import { getAtRiskValueAction } from "../action/insights-action";

const useGetAtRiskValue = (
  workspaceId: string,
  pipelineId?: string,
  enabled = true,
) => {
  return useQuery({
    queryKey: ["insights", "at-risk-value", workspaceId, pipelineId ?? "all"],
    queryFn: () => getAtRiskValueAction(workspaceId, pipelineId),
    enabled: !!workspaceId && enabled,
    retry: 1,
  });
};

export default useGetAtRiskValue;
