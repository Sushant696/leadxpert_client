import { useQuery } from "@tanstack/react-query";
import { getDashboardStatsAction } from "../action/workspace-action";

const useGetDashboardStats = (workspaceId: string) => {
  return useQuery({
    queryKey: ["dashboard-stats", workspaceId],
    queryFn: () => getDashboardStatsAction(workspaceId),
    enabled: !!workspaceId,
  });
};

export default useGetDashboardStats;
