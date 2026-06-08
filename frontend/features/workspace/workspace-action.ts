'use server';

import { workspaceApi } from "./workspace-api";
import { CreateWorkspacePayload } from "./workspace-types";

export async function createWorkspaceAction(formData: CreateWorkspacePayload) {
  try {
    // calling the workspace API to create a new workspace 
    const response = await workspaceApi.createWorkspace(formData);
    if (response.success) {
      return {
        success: true,
        message: response.message || 'Workspace created successfully',
        data: response.data,
      };
    }
    return {
      success: false,
      message: response.message || 'Failed to create workspace'
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Failed to create workspace'
    };
  }
}
