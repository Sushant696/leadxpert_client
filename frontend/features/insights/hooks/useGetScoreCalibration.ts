import { useQuery } from "@tanstack/react-query";
import { getScoreCalibrationAction } from "../action/insights-action";

const useGetScoreCalibration = (
  workspaceId: string,
  pipelineId?: string,
  enabled = true,
) => {
  return useQuery({
    queryKey: ["insights", "score-calibration", workspaceId, pipelineId ?? "all"],
    queryFn: () => getScoreCalibrationAction(workspaceId, pipelineId),
    enabled: !!workspaceId && enabled,
    retry: 1,
  });
};

export default useGetScoreCalibration;
