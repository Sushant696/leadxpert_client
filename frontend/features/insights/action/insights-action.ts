"use server";

import { insightsApi } from "../api/insights-api";
import {
  AtRiskValue,
  ConfusionMatrix,
  DriverRanking,
  FeatureImportanceResponse,
  HotLead,
  LossStageBreakdown,
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
  pipelineId?: string,
): Promise<ScoreCalibrationTier[]> {
  const response = await insightsApi.getScoreCalibration(workspaceId, pipelineId);
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch score calibration");
  }
  return response.data.calibration;
}

export async function getConfusionMatrixAction(
  workspaceId: string,
  pipelineId?: string,
): Promise<ConfusionMatrix> {
  const response = await insightsApi.getConfusionMatrix(workspaceId, pipelineId);
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch confusion matrix");
  }
  return response.data;
}

export async function getPriorityMismatchAction(
  workspaceId: string,
  pipelineId?: string,
): Promise<PriorityMismatchLead[]> {
  const response = await insightsApi.getPriorityMismatch(workspaceId, pipelineId);
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch priority mismatch");
  }
  return response.data.leads;
}

export async function getAtRiskValueAction(
  workspaceId: string,
  pipelineId?: string,
): Promise<AtRiskValue> {
  const response = await insightsApi.getAtRiskValue(workspaceId, pipelineId);
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
  pipelineId?: string,
): Promise<SourcePerformanceRow[]> {
  const response = await insightsApi.getSourcePerformance(workspaceId, pipelineId);
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch source performance");
  }
  return response.data.sources;
}

export async function getDriverRankingAction(
  workspaceId: string,
): Promise<DriverRanking> {
  const response = await insightsApi.getDriverRanking(workspaceId);
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch driver ranking");
  }
  return response.data;
}

export async function getLossStageBreakdownAction(
  workspaceId: string,
  pipelineId?: string,
): Promise<LossStageBreakdown> {
  const response = await insightsApi.getLossStageBreakdown(
    workspaceId,
    pipelineId,
  );
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch loss stage breakdown");
  }
  return response.data;
}
