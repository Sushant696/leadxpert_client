"use client"
import {
  ArrowRight,
  Building2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../hooks/useCreateWorkspace";
import { TWorkspaceForm, WorkspaceSchema } from "../workspace-validators";
import { CreateWorkspacePayload } from "../workspace-types";

interface WorkspaceCreateModalProps {
  setIsCreateWorkspaceOpen: Dispatch<SetStateAction<boolean>>;
}

function WorkspaceCreateModal({ setIsCreateWorkspaceOpen }: WorkspaceCreateModalProps) {
  const { register, handleSubmit, reset } = useForm<TWorkspaceForm>({
    resolver: zodResolver(WorkspaceSchema)
  });

  const createWorkspaceMutaiton = useCreateWorkspace();

  const onSubmit = async (data: TWorkspaceForm) => {
    const payload: CreateWorkspacePayload = {
      name: data.name,
      businessType: data.businessType || undefined,
      teamSize: data.teamSize ? parseInt(data.teamSize, 10) : undefined,
    };

    createWorkspaceMutaiton.mutate(payload, {
      onSuccess: () => {
        setIsCreateWorkspaceOpen(false);
        reset();
      }
    });
  }
  return (
    <DialogContent className="max-w-2xl sm:max-w-xl m-2">
      <DialogHeader>
        <DialogTitle className="text-2xl">Create New Workspace</DialogTitle>
        <DialogDescription>
          Set up your workspace to start managing leads and collaborating with your team.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
        <div className="space-y-2">
          <Label htmlFor="workspace-name">Workspace Name*</Label>
          <Input
            {...register("name")}
            id="workspace-name"
            placeholder="e.g., Acme Digital Solutions"
            className="focus-visible:ring-primary"
          />
          <p className="text-xs text-muted-foreground">
            This will be visible to all team members
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="workspace-type">Business Type</Label>
          <Input
            {...register("businessType")}
            id="workspace-type"
            placeholder="e.g., Digital Marketing Agency"
            className="focus-visible:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="team-size">Expected Team Size</Label>
          <select
            {...register("teamSize")}
            id="team-size"
            className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select team size</option>
            <option value="1-5">1-5 members</option>
            <option value="6-10">6-10 members</option>
            <option value="11-25">11-25 members</option>
            <option value="26+">26+ members</option>
          </select>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-2">
          <div className="flex items-start gap-2">
            <Building2 className="h-5 w-5 text-primary mt-0.5" />
            <div className="space-y-1">
              <p className="font-medium text-sm">You&apos;ll be the Super Admin</p>
              <p className="text-xs text-muted-foreground">
                As the creator, you&apos;ll have full control over workspace settings, pipelines, and team member permissions.
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button onClick={() =>
            setIsCreateWorkspaceOpen(false)
          } variant="outline" className="flex-1">
            Cancel
          </Button>
          <Button type="submit" className="flex-1 gap-2">
            Create Workspace <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}

export default WorkspaceCreateModal;
