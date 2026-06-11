"use server";

import { workspaceApi } from "../api/workspace-api";
import {
  CreateWorkspacePayload,
  TransformedWorkspace,
  WorkspaceMember,
} from "../workspace-types";

export async function createWorkspaceAction(formData: CreateWorkspacePayload) {
  const response = await workspaceApi.createWorkspace(formData);
  if (!response.success) {
    throw new Error(response.message || "Failed to create workspace");
  }
  return response.data;
}

export async function getUserWorkspacesAction() {
  const response = await workspaceApi.getUserWorkspaces();
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch workspaces");
  }
  const usersWorkspaces: TransformedWorkspace[] =
    response.data.workspaces.map((w: WorkspaceMember) => ({
      id: w?.workspace?._id,
      name: w?.workspace?.name,
      slug: w?.workspace?.slug,
      role: w?.role
    }));

  return usersWorkspaces
}
