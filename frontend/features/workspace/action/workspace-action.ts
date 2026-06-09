"use server";

import { workspaceApi } from "../api/workspace-api";
import {
  CreateWorkspacePayload,
  TransformedWorkspace,
} from "../workspace-types";

export async function createWorkspaceAction(formData: CreateWorkspacePayload) {
  try {
    const response = await workspaceApi.createWorkspace(formData);

    if (response.success) {
      return {
        success: true,
        message: response.message || "Workspace created successfully",
        data: response.data,
      };
    }

    throw new Error(response.message || "Failed to create workspace");
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message || "Failed to create workspace");
  }
}

export async function getUserWorkspacesAction() {
  try {
    const response = await workspaceApi.getUserWorkspaces();

    if (response.success) {
      const usersWorkspaces: TransformedWorkspace[] =
        response.data.workspaces.map((w: any) => ({
          name: w.workspace.name,
          slug: w.workspace.slug,
        }));

      return {
        success: true,
        message: response.message || "Workspaces fetched successfully",
        data: {
          usersWorkspaces,
          fullWorkspaces: response.data.workspaces,
        },
      };
    }
    return {
      success: false,
      message: response.message || "Failed to fetch workspaces",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to fetch workspaces",
    };
  }
}
