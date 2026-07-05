import { useQuery } from "@tanstack/react-query";
import { getHotLeadsTodayAction } from "../action/insights-action";

const useGetHotLeadsToday = (workspaceId: string, days?: number) => {
  return useQuery({
    queryKey: ["insights", "hot-leads", workspaceId, days],
    queryFn: () => getHotLeadsTodayAction(workspaceId, days),
    enabled: !!workspaceId,
    retry: 1,
  });
};

export default useGetHotLeadsToday;
