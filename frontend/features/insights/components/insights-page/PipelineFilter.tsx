"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetPipelines from "@/features/pipeline/hooks/useGetPipelines";

export const ALL_PIPELINES = "all";

interface PipelineFilterProps {
  workspaceId: string;
  value: string;
  onChange: (pipelineId: string) => void;
}

export function PipelineFilter({
  workspaceId,
  value,
  onChange,
}: PipelineFilterProps) {
  const { data: pipelines, isLoading } = useGetPipelines(workspaceId);

  return (
    <Select value={value} onValueChange={onChange} disabled={isLoading}>
      <SelectTrigger className="w-[220px]" aria-label="Filter by pipeline">
        <SelectValue placeholder="All pipelines" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL_PIPELINES}>All pipelines</SelectItem>
        {(pipelines ?? []).map((pipeline) => (
          <SelectItem key={pipeline._id} value={pipeline._id}>
            {pipeline.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
