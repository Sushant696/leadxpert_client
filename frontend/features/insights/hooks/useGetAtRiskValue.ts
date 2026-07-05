import { useQuery } from "@tanstack/react-query";
import { getAtRiskValueAction } from "../action/insights-action";

const useGetAtRiskValue = (workspaceId: string, enabled = true) => {
  return useQuery({
    queryKey: ["insights", "at-risk-value", workspaceId],
    queryFn: () => getAtRiskValueAction(workspaceId),
    enabled: !!workspaceId && enabled,
    retry: 1,
  });
};

export default useGetAtRiskValue;
