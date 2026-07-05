"use server";

import { activityApi } from "../api/activity-api";

export async function getActivitiesByEntityAction(
  workspaceId: string,
  entityType: string,
  entityId: string,
) {
  const response = await activityApi.getActivitiesByEntity(
    workspaceId,
    entityType,
    entityId,
  );
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch activities");
  }
  return response.data.activities;
}
