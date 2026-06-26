"use server";

import { dealApi } from "../api/deal-api";
import {
  CreateDealPayload,
  UpdateDealPayload,
  GetDealsFilters,
} from "../types/deal-types";

export async function createDealAction(
  workspaceId: string,
  payload: CreateDealPayload,
) {
  const response = await dealApi.createDeal(workspaceId, payload);
  if (!response.success) {
    throw new Error(response.message || "Failed to create deal");
  }
  return response.data.deal;
}

export async function getDealsByWorkspaceAction(
  workspaceId: string,
  filters?: GetDealsFilters,
) {
  const response = await dealApi.getDealsByWorkspaceId(workspaceId, filters);
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch deals");
  }
  return response;
}

export async function getDealByIdAction(workspaceId: string, dealId: string) {
  const response = await dealApi.getDealById(workspaceId, dealId);
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch deal");
  }
  return response.data.deal;
}

export async function updateDealAction(
  workspaceId: string,
  dealId: string,
  payload: UpdateDealPayload,
) {
  const response = await dealApi.updateDeal(workspaceId, dealId, payload);
  if (!response.success) {
    throw new Error(response.message || "Failed to update deal");
  }
  return response.data.deal;
}

export async function deleteDealAction(workspaceId: string, dealId: string) {
  const response = await dealApi.deleteDeal(workspaceId, dealId);
  if (!response.success) {
    throw new Error(response.message || "Failed to delete deal");
  }
  return { success: true, message: response.message };
}
