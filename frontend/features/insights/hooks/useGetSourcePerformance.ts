import { useQuery } from "@tanstack/react-query";
import { getSourcePerformanceAction } from "../action/insights-action";

const useGetSourcePerformance = (workspaceId: string, enabled = true) => {
  return useQuery({
    queryKey: ["insights", "source-performance", workspaceId],
    queryFn: () => getSourcePerformanceAction(workspaceId),
    enabled: !!workspaceId && enabled,
    retry: 1,
  });
};

export default useGetSourcePerformance;
