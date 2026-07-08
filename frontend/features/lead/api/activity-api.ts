import { apiURLs } from "@/utils/apiUrls";
import { apiWrapper } from "@/lib/api/api-wrapper";
import { GetActivitiesResponse } from "../types/activity-types";

const activityApi = {
  getActivitiesByEntity: async (
    workspaceId: string,
    entityType: string,
    entityId: string,
  ): Promise<GetActivitiesResponse> => {
    return await apiWrapper.get(
      apiURLs.ACTIVITY.getByEntity(workspaceId, entityType, entityId),
    );
  },
};

export { activityApi };
