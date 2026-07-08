"use server";

import { leadApi } from "../api/lead-api";
import {
  CreateLeadPayload,
  UpdateLeadPayload,
  MoveLeadToStagePayload,
  AssignLeadPayload,
  MarkLeadAsLostPayload,
  GetLeadsOptions,
} from "../types/lead-types";

export async function createLeadAction(
  workspaceId: string,
  pipelineId: string,
  data: CreateLeadPayload,
) {
  const response = await leadApi.createLead(workspaceId, pipelineId, data);
  if (!response.success) {
    throw new Error(response.message || "Failed to create lead");
  }
  return response.data.lead;
}

export async function getLeadsAction(
  workspaceId: string,
  pipelineId: string,
  options?: GetLeadsOptions,
) {
  const response = await leadApi.getLeads(workspaceId, pipelineId, options);
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch leads");
  }
  return response.data.leads;
}

export async function getLeadByIdAction(
  workspaceId: string,
  pipelineId: string,
  leadId: string,
) {
  const response = await leadApi.getLeadById(workspaceId, pipelineId, leadId);
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch lead");
  }
  return response.data.lead;
}

// Workspace-scoped single-lead fetch for the detail page (no pipeline id).
export async function getLeadDetailAction(workspaceId: string, leadId: string) {
  const response = await leadApi.getLeadDetail(workspaceId, leadId);
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch lead");
  }
  return response.data.lead;
}

export async function updateLeadAction(
  workspaceId: string,
  pipelineId: string,
  leadId: string,
  data: UpdateLeadPayload,
) {
  const response = await leadApi.updateLead(
    workspaceId,
    pipelineId,
    leadId,
    data,
  );
  if (!response.success) {
    throw new Error(response.message || "Failed to update lead");
  }
  return response.data.lead;
}

export async function moveLeadToStageAction(
  workspaceId: string,
  pipelineId: string,
  leadId: string,
  data: MoveLeadToStagePayload,
) {
  const response = await leadApi.moveLeadToStage(
    workspaceId,
    pipelineId,
    leadId,
    data,
  );
  if (!response.success) {
    throw new Error(response.message || "Failed to move lead");
  }
  return response.data.lead;
}

export async function assignLeadToUserAction(
  workspaceId: string,
  pipelineId: string,
  leadId: string,
  data: AssignLeadPayload,
) {
  const response = await leadApi.assignLeadToUser(
    workspaceId,
    pipelineId,
    leadId,
    data,
  );
  if (!response.success) {
    throw new Error(response.message || "Failed to assign lead");
  }
  return response.data.lead;
}

export async function convertLeadToDealAction(
  workspaceId: string,
  pipelineId: string,
  leadId: string,
) {
  const response = await leadApi.convertLeadToDeal(
    workspaceId,
    pipelineId,
    leadId,
  );
  if (!response.success) {
    throw new Error(response.message || "Failed to convert lead");
  }
  return response.data;
}

export async function markLeadAsLostAction(
  workspaceId: string,
  pipelineId: string,
  leadId: string,
  data: MarkLeadAsLostPayload,
) {
  const response = await leadApi.markLeadAsLost(
    workspaceId,
    pipelineId,
    leadId,
    data,
  );
  if (!response.success) {
    throw new Error(response.message || "Failed to mark lead as lost");
  }
  return response.data.lead;
}

export async function archiveLeadAction(
  workspaceId: string,
  pipelineId: string,
  leadId: string,
) {
  const response = await leadApi.archiveLead(workspaceId, pipelineId, leadId);
  if (!response.success) {
    throw new Error(response.message || "Failed to archive lead");
  }
  return response.data.message;
}

export async function scoreLeadAction(leadId: string) {
  // ML route responds with a bare object (no success envelope); the freshly
  // written ml fields are picked up by invalidating the lead query afterward.
  return await leadApi.scoreLead(leadId);
}
