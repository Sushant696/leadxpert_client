import { apiURLs } from "@/utils/apiUrls";
import { apiWrapper } from "@/lib/api/api-wrapper";

export const insightsApi = {
  getHotLeadsToday: (workspaceId: string, days?: number) =>
    apiWrapper.get(
      apiURLs.INSIGHTS.hotLeads(workspaceId),
      days ? { days } : undefined,
    ),

  getStageFunnel: (workspaceId: string, pipelineId?: string) =>
    apiWrapper.get(
      apiURLs.INSIGHTS.stageFunnel(workspaceId),
      pipelineId ? { pipelineId } : undefined,
    ),

  getScoreCalibration: (workspaceId: string, pipelineId?: string) =>
    apiWrapper.get(
      apiURLs.INSIGHTS.scoreCalibration(workspaceId),
      pipelineId ? { pipelineId } : undefined,
    ),

  getConfusionMatrix: (workspaceId: string, pipelineId?: string) =>
    apiWrapper.get(
      apiURLs.INSIGHTS.confusionMatrix(workspaceId),
      pipelineId ? { pipelineId } : undefined,
    ),

  getPriorityMismatch: (workspaceId: string, pipelineId?: string) =>
    apiWrapper.get(
      apiURLs.INSIGHTS.priorityMismatch(workspaceId),
      pipelineId ? { pipelineId } : undefined,
    ),

  getAtRiskValue: (workspaceId: string, pipelineId?: string) =>
    apiWrapper.get(
      apiURLs.INSIGHTS.atRiskValue(workspaceId),
      pipelineId ? { pipelineId } : undefined,
    ),

  getFeatureImportance: (workspaceId: string) =>
    apiWrapper.get(apiURLs.INSIGHTS.featureImportance(workspaceId)),

  getSourcePerformance: (workspaceId: string, pipelineId?: string) =>
    apiWrapper.get(
      apiURLs.INSIGHTS.sourcePerformance(workspaceId),
      pipelineId ? { pipelineId } : undefined,
    ),

  getDriverRanking: (workspaceId: string) =>
    apiWrapper.get(apiURLs.INSIGHTS.driverRanking(workspaceId)),

  getLossStageBreakdown: (workspaceId: string, pipelineId?: string) =>
    apiWrapper.get(
      apiURLs.INSIGHTS.lossStageBreakdown(workspaceId),
      pipelineId ? { pipelineId } : undefined,
    ),
};
