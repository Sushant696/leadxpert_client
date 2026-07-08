"use server";

import { insightsApi } from "../api/insights-api";
import {
  AtRiskValue,
  ConfusionMatrix,
  FeatureImportanceResponse,
  HotLead,
  PriorityMismatchLead,
  ScoreCalibrationTier,
  SourcePerformanceRow,
  StageFunnel,
} from "../insights-types";

export async function getHotLeadsTodayAction(
  workspaceId: string,
  days?: number,
): Promise<HotLead[]> {
  const response = await insightsApi.getHotLeadsToday(workspaceId, days);
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch hot leads");
  }
  return response.data.leads;
}

export async function getStageFunnelAction(
  workspaceId: string,
  pipelineId?: string,
): Promise<StageFunnel> {
  const response = await insightsApi.getStageFunnel(workspaceId, pipelineId);
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch stage funnel");
  }
  return response.data;
}

export async function getScoreCalibrationAction(
  workspaceId: string,
): Promise<ScoreCalibrationTier[]> {
  const response = await insightsApi.getScoreCalibration(workspaceId);
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch score calibration");
  }
  return response.data.calibration;
}

export async function getConfusionMatrixAction(
  workspaceId: string,
): Promise<ConfusionMatrix> {
  const response = await insightsApi.getConfusionMatrix(workspaceId);
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch confusion matrix");
  }
  return response.data;
}

export async function getPriorityMismatchAction(
  workspaceId: string,
): Promise<PriorityMismatchLead[]> {
  const response = await insightsApi.getPriorityMismatch(workspaceId);
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch priority mismatch");
  }
  return response.data.leads;
}

export async function getAtRiskValueAction(
  workspaceId: string,
): Promise<AtRiskValue> {
  const response = await insightsApi.getAtRiskValue(workspaceId);
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch at-risk value");
  }
  return response.data;
}

export async function getFeatureImportanceAction(
  workspaceId: string,
): Promise<FeatureImportanceResponse> {
  const response = await insightsApi.getFeatureImportance(workspaceId);
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch feature importance");
  }
  return response.data;
}

export async function getSourcePerformanceAction(
  workspaceId: string,
): Promise<SourcePerformanceRow[]> {
  const response = await insightsApi.getSourcePerformance(workspaceId);
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch source performance");
  }
  return response.data.sources;
}
