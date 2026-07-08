"use client";

import { useState } from "react";
import { CheckCircle2, Circle, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useGetAllTasks from "../hooks/useGetAllTasks";
import useCompleteTask from "../hooks/useCompleteTask";
import { QuickTaskModal } from "./QuickTaskModal";
import { Task, TaskPriority } from "../types/task-types";

interface TasksPanelProps {
  workspaceId: string;
  pipelineId: string;
  leadId: string;
}

const priorityColor: Record<TaskPriority, string> = {
  LOW: "bg-blue-500/10 text-blue-700 border-blue-200",
  MEDIUM: "bg-yellow-500/10 text-yellow-700 border-yellow-200",
  HIGH: "bg-orange-500/10 text-orange-700 border-orange-200",
};

function TaskRow({ task, workspaceId }: { task: Task; workspaceId: string }) {
  const completeMutation = useCompleteTask(workspaceId);
  const isDone = task.status === "COMPLETED" || task.status === "CANCELLED";

  return (
    <div className="flex items-start gap-3 py-2.5">
      <button
        onClick={() => !isDone && completeMutation.mutate(task._id)}
        disabled={isDone || completeMutation.isPending}
        className="mt-0.5 shrink-0 text-muted-foreground hover:text-primary disabled:cursor-default transition-colors"
        aria-label={isDone ? "Completed" : "Mark complete"}
      >
        {isDone ? (
          <CheckCircle2 size={16} className="text-emerald-500" />
        ) : (
          <Circle size={16} />
        )}
      </button>
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-sm font-medium",
            isDone && "line-through text-muted-foreground",
          )}
        >
          {task.title}
        </p>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
          <Badge
            variant="outline"
            className={cn("text-[10px] px-1.5 py-0", priorityColor[task.priority])}
          >
            {task.priority}
          </Badge>
          {task.dueDate && (
            <span className="text-[11px] text-muted-foreground">
              Due{" "}
              {new Date(task.dueDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          )}
          {task.assignedTo && (
            <span className="text-[11px] text-muted-foreground">
              · {task.assignedTo.name}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function TasksPanel({ workspaceId, pipelineId, leadId }: TasksPanelProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: tasks = [], isLoading } = useGetAllTasks(workspaceId, {
    entityType: "LEAD",
    entityId: leadId,
  });

  const sortedTasks = [...tasks].sort((a, b) => {
    const aDone = a.status === "COMPLETED" || a.status === "CANCELLED";
    const bDone = b.status === "COMPLETED" || b.status === "CANCELLED";
    if (aDone !== bDone) return aDone ? 1 : -1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <Button variant="outline" size="xs" onClick={() => setIsModalOpen(true)}>
          <Plus size={12} /> Add Task
        </Button>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading tasks…</p>
      ) : sortedTasks.length === 0 ? (
        <p className="text-sm text-muted-foreground italic">No tasks yet.</p>
      ) : (
        <div className="divide-y divide-border">
          {sortedTasks.map((task) => (
            <TaskRow key={task._id} task={task} workspaceId={workspaceId} />
          ))}
        </div>
      )}

      {isModalOpen && (
        <QuickTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          leadId={leadId}
          workspaceId={workspaceId}
          pipelineId={pipelineId}
        />
      )}
    </div>
  );
}
