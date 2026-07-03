import { apiURLs } from "@/utils/apiUrls";
import { apiWrapper } from "@/lib/api/api-wrapper";
import {
  CreateLeadPayload,
  UpdateLeadPayload,
  MoveLeadToStagePayload,
  AssignLeadPayload,
  MarkLeadAsLostPayload,
  GetLeadsOptions,
  CreateLeadResponse,
  GetLeadsResponse,
  GetLeadByIdResponse,
  UpdateLeadResponse,
  MoveLeadResponse,
  AssignLeadResponse,
  ConvertLeadResponse,
  MarkLeadAsLostResponse,
  ArchiveLeadResponse,
  ScoreLeadResponse,
} from "../types/lead-types";

const leadApi = {
  getAllLeads: async (
    workspaceId: string,
    options?: GetLeadsOptions,
  ): Promise<GetLeadsResponse> => {
    return await apiWrapper.get(
      apiURLs.LEAD.getAllByWorkspace(workspaceId),
      options,
    );
  },

  createLead: async (
    workspaceId: string,
    pipelineId: string,
    data: CreateLeadPayload,
  ): Promise<CreateLeadResponse> => {
    return await apiWrapper.post(
      apiURLs.LEAD.create(workspaceId, pipelineId),
      data,
    );
  },

  getLeads: async (
    workspaceId: string,
    pipelineId: string,
    options?: GetLeadsOptions,
  ): Promise<GetLeadsResponse> => {
    return await apiWrapper.get(
      apiURLs.LEAD.getAll(workspaceId, pipelineId),
      options,
    );
  },

  getLeadById: async (
    workspaceId: string,
    pipelineId: string,
    leadId: string,
  ): Promise<GetLeadByIdResponse> => {
    return await apiWrapper.get(
      apiURLs.LEAD.getById(workspaceId, pipelineId, leadId),
    );
  },

  updateLead: async (
    workspaceId: string,
    pipelineId: string,
    leadId: string,
    data: UpdateLeadPayload,
  ): Promise<UpdateLeadResponse> => {
    return await apiWrapper.patch(
      apiURLs.LEAD.update(workspaceId, pipelineId, leadId),
      data,
    );
  },

  moveLeadToStage: async (
    workspaceId: string,
    pipelineId: string,
    leadId: string,
    data: MoveLeadToStagePayload,
  ): Promise<MoveLeadResponse> => {
    return await apiWrapper.patch(
      apiURLs.LEAD.moveToStage(workspaceId, pipelineId, leadId),
      data,
    );
  },

  assignLeadToUser: async (
    workspaceId: string,
    pipelineId: string,
    leadId: string,
    data: AssignLeadPayload,
  ): Promise<AssignLeadResponse> => {
    return await apiWrapper.patch(
      apiURLs.LEAD.assign(workspaceId, pipelineId, leadId),
      data,
    );
  },

  convertLeadToDeal: async (
    workspaceId: string,
    pipelineId: string,
    leadId: string,
  ): Promise<ConvertLeadResponse> => {
    return await apiWrapper.patch(
      apiURLs.LEAD.convert(workspaceId, pipelineId, leadId),
      {},
    );
  },

  markLeadAsLost: async (
    workspaceId: string,
    pipelineId: string,
    leadId: string,
    data: MarkLeadAsLostPayload,
  ): Promise<MarkLeadAsLostResponse> => {
    return await apiWrapper.patch(
      apiURLs.LEAD.markLost(workspaceId, pipelineId, leadId),
      data,
    );
  },

  archiveLead: async (
    workspaceId: string,
    pipelineId: string,
    leadId: string,
  ): Promise<ArchiveLeadResponse> => {
    return await apiWrapper.delete(
      apiURLs.LEAD.archive(workspaceId, pipelineId, leadId),
    );
  },

  // Manually (re)score a lead. The ML route returns a bare object, not the
  // standard { success, data } envelope, so callers read fields directly.
  scoreLead: async (leadId: string): Promise<ScoreLeadResponse> => {
    return await apiWrapper.post(apiURLs.ML.scoreLead(leadId), {});
  },
};

export { leadApi };
