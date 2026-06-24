"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Plus, CalendarIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCreateTask from "../hooks/useCreateTask";
import { useGetAllMembers } from "@/features/workspace/hooks/useGetAllMembers";

const quickTaskSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  dueDate: z.string().optional(),
  assignedTo: z.string().optional(),
});

type QuickTaskFormData = z.infer<typeof quickTaskSchema>;

interface QuickTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadId: string;
  workspaceId: string;
  pipelineId: string;
}

export function QuickTaskModal({
  isOpen,
  onClose,
  leadId,
  workspaceId,
  pipelineId,
}: QuickTaskModalProps) {
  const createTaskMutation = useCreateTask(workspaceId, pipelineId);
  const { data: membersData } = useGetAllMembers(workspaceId);
  const members = Array.isArray(membersData) ? membersData : membersData?.members || [];

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<QuickTaskFormData>({
    resolver: zodResolver(quickTaskSchema),
    defaultValues: {
      title: "",
      dueDate: "",
      assignedTo: "",
    },
  });

  const onSubmit = (data: QuickTaskFormData) => {
    createTaskMutation.mutate(
      {
        title: data.title,
        entityType: "LEAD",
        entityId: leadId,
        dueDate: data.dueDate || null,
        assignedTo: data.assignedTo || null,
        type: "FOLLOW_UP",
        priority: "MEDIUM",
      },
      {
        onSuccess: () => {
          reset();
          onClose();
        },
      },
    );
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  // Set tomorrow as default min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-base">Quick Add Task</DialogTitle>
          <DialogDescription className="text-xs">
            Create a follow-up task for this lead.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div className="space-y-1.5">
            <Label htmlFor="task-title" className="text-xs font-medium">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="task-title"
              placeholder="e.g. Follow up on proposal"
              {...register("title")}
              className="h-8 text-sm"
              autoFocus
            />
            {errors.title && (
              <p className="text-[10px] text-destructive">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Due Date */}
          <div className="space-y-1.5">
            <Label htmlFor="task-due-date" className="text-xs font-medium">
              Due Date
            </Label>
            <div className="relative">
              <Input
                id="task-due-date"
                type="date"
                min={minDate}
                {...register("dueDate")}
                className="h-8 text-sm"
              />
            </div>
          </div>

          {/* Assign To */}
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Assign To</Label>
            <Select
              onValueChange={(value) =>
                setValue("assignedTo", value === "unassigned" ? "" : value)
              }
            >
              <SelectTrigger className="h-8 text-sm">
                <SelectValue placeholder="Select member" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unassigned" className="text-xs">
                  Unassigned
                </SelectItem>
                {members.map((member: any) => (
                  <SelectItem
                    key={member.user.id}
                    value={member.user.id}
                    className="text-xs"
                  >
                    {member.user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleClose}
              disabled={createTaskMutation.isPending}
              className="text-xs h-7"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={createTaskMutation.isPending}
              className="text-xs h-7"
            >
              {createTaskMutation.isPending ? (
                <>
                  <Loader2 size={12} className="mr-1 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus size={12} className="mr-1" />
                  Add Task
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
