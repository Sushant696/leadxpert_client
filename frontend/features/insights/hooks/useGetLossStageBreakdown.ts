import { useQuery } from "@tanstack/react-query";
import { getLossStageBreakdownAction } from "../action/insights-action";

const useGetLossStageBreakdown = (
  workspaceId: string,
  pipelineId?: string,
  enabled = true,
) => {
  return useQuery({
    queryKey: [
      "insights",
      "loss-stage-breakdown",
      workspaceId,
      pipelineId ?? "all",
    ],
    queryFn: () => getLossStageBreakdownAction(workspaceId, pipelineId),
    enabled: !!workspaceId && enabled,
    retry: 1,
  });
};

export default useGetLossStageBreakdown;
