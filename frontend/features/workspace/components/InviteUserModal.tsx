"use client"

import { useState } from "react";
import { Mail, Copy, Check } from "lucide-react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { showToast } from "@/components/showToast";
import { useGetInvitationLink } from "../hooks/useGetInvitationLink";
import { useSendInviteByEmail } from "../hooks/useSendInviteByEmail";

interface InviteMemberModalProps {
  workspaceId: string;
  workspaceSlug: string;
}

export default function InviteMemberModal({ workspaceId }: InviteMemberModalProps) {
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const invitationMutation = useGetInvitationLink();
  const emailInviteMutation = useSendInviteByEmail();
  const [inviteLink, setInviteLink] = useState<string>("");

  const resolveInviteLink = (data: unknown) => {
    if (!data || typeof data !== "object") {
      return "";
    }

    const payload = data as Record<string, unknown>;
    const directLink =
      payload.inviteLink ||
      payload.link ;

    if (typeof directLink === "string" && directLink.length > 0) {
      return directLink;  
    }
    return "";  
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink || "");
    setCopied(true);
    showToast.success("Link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendInvite = async () => {
    if (!email.trim()) return;
    await emailInviteMutation.mutateAsync({
      workspaceId,
      email: email.trim(),
    });
    setEmail("");
  };

  const handleGenerateLink = async () => {
    const data = await invitationMutation.mutateAsync(workspaceId);
    const resolvedLink = resolveInviteLink(data);
    if (!resolvedLink) {
      showToast.error("Invite link not returned from server");
      return;
    }
    setInviteLink(resolvedLink);
  }

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Invite Team Members</DialogTitle>
        <DialogDescription>
          Invite people to collaborate in this workspace
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 py-4">
        {/* Email Invite */}
        <div className="space-y-2">
          <Label htmlFor="email">Invite by Email</Label>
          <div className="flex gap-2">
            <Input
              id="email"
              type="email"
              placeholder="colleague@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              onClick={handleSendInvite}
              disabled={!email.trim() || emailInviteMutation.isPending}
            >
              <Mail className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Or Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        <Button
          onClick={handleGenerateLink}
        >
          Generate Invite Link
        </Button>

        {/* Copy Link */}
        <div className="space-y-2">
          <Label>Share Invite Link</Label>
          <div className="flex gap-2">
            <Input
              readOnly
              value={inviteLink}
              className="font-mono text-xs"
            />
            <Button
              variant="outline"
              onClick={handleCopyLink}
              className="shrink-0"
              disabled={!inviteLink}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Anyone with this link can join the workspace
          </p>
        </div>
      </div>
    </DialogContent>
  );
}
