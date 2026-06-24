import {
  CreateDealPayload,
  UpdateDealPayload,
  CreateDealResponse,
  GetDealResponse,
  UpdateDealResponse,
  DeleteDealResponse,
  GetDealsFilters,
} from "../types/deal-types";
import { apiURLs } from "@/utils/apiUrls";
import { apiWrapper } from "@/lib/api/api-wrapper";

export const dealApi = {
  async createDeal(workspaceId: string, payload: CreateDealPayload) {
    return apiWrapper.post<CreateDealResponse>(
      apiURLs.DEAL.create(workspaceId),
      payload,
    );
  },

  async getDealsByWorkspaceId(workspaceId: string, filters?: GetDealsFilters) {
    return apiWrapper.get(apiURLs.DEAL.getAll(workspaceId), filters);
  },

  async getDealById(workspaceId: string, dealId: string) {
    return apiWrapper.get<GetDealResponse>(
      apiURLs.DEAL.getById(workspaceId, dealId),
    );
  },

  async updateDeal(
    workspaceId: string,
    dealId: string,
    payload: UpdateDealPayload,
  ) {
    return apiWrapper.patch<UpdateDealResponse>(
      apiURLs.DEAL.update(workspaceId, dealId),
      payload,
    );
  },

  async deleteDeal(workspaceId: string, dealId: string) {
    return apiWrapper.delete<DeleteDealResponse>(
      apiURLs.DEAL.delete(workspaceId, dealId),
    );
  },
};
