import { useQuery } from "@tanstack/react-query";
import { getActivitiesByEntityAction } from "../action/activity-action";

const useGetActivities = (
  workspaceId: string,
  entityType: string,
  entityId: string,
  enabled = true,
) => {
  return useQuery({
    queryKey: ["activities", workspaceId, entityType, entityId],
    queryFn: () =>
      getActivitiesByEntityAction(workspaceId, entityType, entityId),
    enabled: !!workspaceId && !!entityId && enabled,
  });
};

export default useGetActivities;
