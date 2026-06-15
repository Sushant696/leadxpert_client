"use client"
import {
  ArrowRight,
  Users,
  Link as LinkIcon
} from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useJoinWorkspace } from "@/features/auth/hooks/useJoinWorkspace";

interface WorkspaceCreateModalProps {
  setIsJoinWorkspaceOpen: Dispatch<SetStateAction<boolean>>;
}

function WorkspaceJoinModal({ setIsJoinWorkspaceOpen }: WorkspaceCreateModalProps) {
  const [link, setLink] = useState("");
  const [token, setToken] = useState("");

  const joinWorkspaceMutation = useJoinWorkspace(token, () => setIsJoinWorkspaceOpen(false));

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputLink = e.target.value;
    setLink(inputLink);

    const extractedToken = inputLink.split('/').pop()?.trim() || "";
    setToken(extractedToken);
  };

  const handleJoinWorkspace = () => {
    if (!token) return;
    joinWorkspaceMutation.mutate();
  };

  return (
    <DialogContent className="max-w-2xl sm:max-w-xl m-2">
      <DialogHeader>
        <DialogTitle className="text-2xl">Join Workspace</DialogTitle>
        <DialogDescription>
          Enter the invitation link shared by your team admin to join their workspace.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6 py-4">
        <div className="space-y-2">
          <Label htmlFor="invite-link">Invitation Link*</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="invite-link"
                value={link}
                onChange={handleLinkChange}
                placeholder="https://leadxpert.com/invite/abc123..."
                className="pl-10 focus-visible:ring-accent"
              />
            </div>
          </div>

          {token && (
            <p className="text-xs text-success flex items-center gap-1">
              ✓ Token: {token}
            </p>
          )}

          <p className="text-xs text-muted-foreground">
            Paste the invitation link you received via email or message
          </p>
        </div>

        <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 space-y-3">
          <div className="flex items-start gap-2">
            <Users className="h-5 w-5 text-accent mt-0.5" />
            <div className="space-y-1">
              <p className="font-medium text-sm">What happens next?</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• You'll join as a team member (Agent role)</li>
                <li>• Access to workspace pipelines and leads</li>
                <li>• Your admin can adjust your permissions</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <p className="text-sm text-muted-foreground text-center">
            Don't have an invite link?{" "}
            <button className="text-accent hover:underline font-medium">
              Contact your workspace admin
            </button>
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={() => setIsJoinWorkspaceOpen(false)}
          variant="outline"
          className="flex-1"
          disabled={joinWorkspaceMutation.isPending}
        >
          Cancel
        </Button>
        <Button
          onClick={handleJoinWorkspace}
          className="flex-1 gap-2 bg-accent hover:bg-accent/90"
          disabled={!token || joinWorkspaceMutation.isPending}
        >
          {joinWorkspaceMutation.isPending ? "Joining..." : "Join Workspace"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </DialogContent>
  );
}

export default WorkspaceJoinModal;
