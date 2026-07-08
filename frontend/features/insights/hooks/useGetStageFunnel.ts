import { useQuery } from "@tanstack/react-query";
import { getStageFunnelAction } from "../action/insights-action";

const useGetStageFunnel = (workspaceId: string, pipelineId?: string) => {
  return useQuery({
    queryKey: ["insights", "stage-funnel", workspaceId, pipelineId],
    queryFn: () => getStageFunnelAction(workspaceId, pipelineId),
    enabled: !!workspaceId,
    retry: 1,
  });
};

export default useGetStageFunnel;
