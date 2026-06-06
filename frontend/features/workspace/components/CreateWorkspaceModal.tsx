"use client"
import {
  ArrowRight,
  Building2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function WorkspaceCreateModal() {
  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle className="text-2xl">Create New Workspace</DialogTitle>
        <DialogDescription>
          Set up your workspace to start managing leads and collaborating with your team.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6 py-4">
        <div className="space-y-2">
          <Label htmlFor="workspace-name">Workspace Name*</Label>
          <Input
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
            id="workspace-type"
            placeholder="e.g., Digital Marketing Agency"
            className="focus-visible:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="team-size">Expected Team Size</Label>
          <select
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
              <p className="font-medium text-sm">You'll be the Super Admin</p>
              <p className="text-xs text-muted-foreground">
                As the creator, you'll have full control over workspace settings, pipelines, and team member permissions.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" className="flex-1">
          Cancel
        </Button>
        <Button className="flex-1 gap-2">
          Create Workspace <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </DialogContent>
  );
}

export default WorkspaceCreateModal;
