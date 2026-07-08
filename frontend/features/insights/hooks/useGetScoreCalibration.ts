import { useQuery } from "@tanstack/react-query";
import { getScoreCalibrationAction } from "../action/insights-action";

const useGetScoreCalibration = (workspaceId: string, enabled = true) => {
  return useQuery({
    queryKey: ["insights", "score-calibration", workspaceId],
    queryFn: () => getScoreCalibrationAction(workspaceId),
    enabled: !!workspaceId && enabled,
    retry: 1,
  });
};

export default useGetScoreCalibration;
