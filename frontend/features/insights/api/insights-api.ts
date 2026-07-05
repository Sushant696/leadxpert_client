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

  getScoreCalibration: (workspaceId: string) =>
    apiWrapper.get(apiURLs.INSIGHTS.scoreCalibration(workspaceId)),

  getConfusionMatrix: (workspaceId: string) =>
    apiWrapper.get(apiURLs.INSIGHTS.confusionMatrix(workspaceId)),

  getPriorityMismatch: (workspaceId: string) =>
    apiWrapper.get(apiURLs.INSIGHTS.priorityMismatch(workspaceId)),

  getAtRiskValue: (workspaceId: string) =>
    apiWrapper.get(apiURLs.INSIGHTS.atRiskValue(workspaceId)),

  getFeatureImportance: (workspaceId: string) =>
    apiWrapper.get(apiURLs.INSIGHTS.featureImportance(workspaceId)),

  getSourcePerformance: (workspaceId: string) =>
    apiWrapper.get(apiURLs.INSIGHTS.sourcePerformance(workspaceId)),
};
