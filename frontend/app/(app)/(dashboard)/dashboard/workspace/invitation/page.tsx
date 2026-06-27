"use client";

import { useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Clock,
  Copy,
  FileText,
  Link2,
  Mail,
  Shield,
  Sparkles,
  Trash2,
  Users,
} from "lucide-react";

import useWorkspaceStore from "@/store/workspace-store";
import {
  useGetActiveInvites,
  useRevokeInvite,
} from "@/features/workspace/hooks/useGetActiveInvites";
import { showToast } from "@/components/showToast";

type Invite = {
  _id: string;
  type: "LINK" | "EMAIL";
  email?: string;
  token: string;
  role: string;
  usageCount?: number;
  maxUses?: number | null;
  createdAt: string;
  expiresAt: string;
};

function InvitationPage() {
  const { workspace } = useWorkspaceStore();
  const [revokeInviteId, setRevokeInviteId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const { data, isLoading, isError } = useGetActiveInvites(workspace?.id || "");
  const revokeInviteMutation = useRevokeInvite();

  const invites: Invite[] = Array.isArray(data)
    ? data
    : data?.invites || data?.invities || [];

  const now = new Date();
  const totalInvites = invites.length;
  const linkInvites = invites.filter((invite) => invite.type === "LINK").length;
  const emailInvites = invites.filter(
    (invite) => invite.type === "EMAIL",
  ).length;
  const expiringSoon = invites.filter((invite) => {
    const expiresAt = new Date(invite.expiresAt);
    const diffMs = expiresAt.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return diffDays > 0 && diffDays <= 3;
  }).length;

  const handleCopyLink = async (token: string) => {
    const inviteLink = `${window.location.origin}/invite/${token}`;

    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopiedId(token);
      showToast.success("Invite link copied to clipboard");
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      showToast.error("Failed to copy invite link");
    }
  };

  const handleRevokeInvite = (inviteId: string) => {
    if (!workspace?.id) return;

    revokeInviteMutation.mutate(
      { workspaceId: workspace.id, inviteId },
      {
        onSuccess: () => {
          showToast.success("Invitation revoked");
          setRevokeInviteId(null);
        },
        onError: () => {
          showToast.error("Failed to revoke invitation");
        },
      },
    );
  };

  if (!workspace?.id) {
    return (
      <Card className="border-warning/30 bg-warning/10">
        <CardContent className="p-8 text-center">
          <AlertCircle className="mx-auto mb-2 h-8 w-8 text-warning" />
          <p className="font-medium text-foreground">
            Please select a workspace first
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 w-full m-6">
      <div className="rounded-2xl border border-primary/15 bg-linear-to-r from-primary/10 via-primary/5 to-background p-5 sm:p-6">
        <div className="">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Workspace Access
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Invitations
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Share access links or track email invites for your team.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:min-w-65">
            <div className="rounded-xl border border-border bg-card px-3 py-2">
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="text-lg font-semibold text-foreground">
                {totalInvites}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card px-3 py-2">
              <p className="text-xs text-muted-foreground">Expiring soon</p>
              <p className="text-lg font-semibold text-warning">
                {expiringSoon}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card px-3 py-2">
              <p className="text-xs text-muted-foreground">Link</p>
              <p className="text-lg font-semibold text-foreground">
                {linkInvites}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card px-3 py-2">
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-lg font-semibold text-foreground">
                {emailInvites}
              </p>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <Card key={item}>
              <CardContent className="p-5">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 w-2/5 rounded bg-muted" />
                  <div className="h-3 w-3/5 rounded bg-muted" />
                  <div className="h-10 w-full rounded bg-muted" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : isError ? (
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="p-8 text-center">
            <AlertCircle className="mx-auto mb-2 h-8 w-8 text-destructive" />
            <p className="font-semibold text-foreground">
              Failed to load invitations
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Please refresh the page and try again.
            </p>
          </CardContent>
        </Card>
      ) : invites.length === 0 ? (
        <Card className="border-dashed bg-linear-to-b from-background to-muted/30">
          <CardContent className="p-12 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Users className="h-7 w-7 text-primary" />
            </div>
            <h3 className="mb-1 text-lg font-semibold text-foreground">
              No active invitations
            </h3>
            <p className="mx-auto max-w-md text-sm text-muted-foreground">
              Create an invitation to invite team members to your workspace
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {invites.map((invite) => {
            const isLinkType = invite.type === "LINK";
            const isExpired = new Date(invite.expiresAt) < now;
            const expiresInDays = Math.ceil(
              (new Date(invite.expiresAt).getTime() - now.getTime()) /
                (1000 * 60 * 60 * 24),
            );
            const isExpiringSoon = !isExpired && expiresInDays <= 3;

            return (
              <Card
                key={invite._id}
                className={`overflow-hidden border transition-all duration-200 hover:shadow-md ${
                  isExpired ? "opacity-60" : ""
                } ${isExpiringSoon ? "border-warning/40" : ""}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start gap-3">
                    <div
                      className={`rounded-xl p-2.5 ${
                        isLinkType
                          ? "bg-primary/10 text-primary"
                          : "bg-accent/10 text-accent"
                      }`}
                    >
                      {isLinkType ? (
                        <Link2 className="h-5 w-5" />
                      ) : (
                        <Mail className="h-5 w-5" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <CardTitle className="text-base font-semibold">
                          {isLinkType ? "Shareable Link" : "Email Invitation"}
                        </CardTitle>
                        {isExpired && (
                          <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-[11px] font-semibold text-destructive">
                            Expired
                          </span>
                        )}
                        {isExpiringSoon && (
                          <span className="rounded-full bg-warning/15 px-2 py-0.5 text-[11px] font-semibold text-warning">
                            Expires soon
                          </span>
                        )}
                      </div>

                      <CardDescription className="text-sm">
                        {isLinkType
                          ? "Anyone with this link can join your workspace"
                          : `Sent to ${invite.email || "team member"}`}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-lg border bg-muted/30 p-3">
                      <div className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CalendarDays className="h-3.5 w-3.5" /> Created
                      </div>
                      <p className="text-sm font-semibold text-foreground">
                        {format(new Date(invite.createdAt), "MMM dd, yyyy")}
                      </p>
                    </div>

                    <div className="rounded-lg border bg-muted/30 p-3">
                      <div className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" /> Expires
                      </div>
                      <p
                        className={`text-sm font-semibold ${
                          isExpired ? "text-destructive" : "text-foreground"
                        }`}
                      >
                        {isExpired
                          ? "Expired"
                          : formatDistanceToNow(new Date(invite.expiresAt), {
                              addSuffix: true,
                            })}
                      </p>
                    </div>

                    {isLinkType ? (
                      <div className="rounded-lg border bg-muted/30 p-3">
                        <div className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Users className="h-3.5 w-3.5" /> Usage
                        </div>
                        <p className="text-sm font-semibold text-foreground">
                          {invite.usageCount || 0} / {invite.maxUses || "∞"}
                        </p>
                      </div>
                    ) : (
                      <div className="rounded-lg border bg-muted/30 p-3">
                        <div className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Mail className="h-3.5 w-3.5" /> Channel
                        </div>
                        <p className="text-sm font-semibold text-foreground">
                          Email
                        </p>
                      </div>
                    )}

                    <div className="rounded-lg border bg-muted/30 p-3">
                      <div className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Shield className="h-3.5 w-3.5" /> Role
                      </div>
                      <p className="text-sm font-semibold capitalize text-primary">
                        {invite.role}
                      </p>
                    </div>
                  </div>

                  {isLinkType && (
                    <div className="rounded-xl border border-primary/20 bg-linear-to-r from-primary/5 to-primary/10 p-3">
                      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        Invite Link
                      </p>
                      <div className="flex items-center gap-2 rounded-lg border bg-background p-2">
                        <code className="flex-1 truncate font-mono text-xs text-foreground">
                          {`${window.location.origin}/invite/${invite.token}`}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="shrink-0 text-primary hover:bg-primary/10"
                          onClick={() => handleCopyLink(invite.token)}
                        >
                          {copiedId === invite.token ? (
                            <>
                              <CheckCircle2 className="h-4 w-4" />
                              <span className="ml-1 hidden sm:inline">
                                Copied
                              </span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" />
                              <span className="ml-1 hidden sm:inline">
                                Copy
                              </span>
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>

                <div className="flex items-center justify-between border-t bg-muted/20 px-6 py-3">
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <FileText className="h-3.5 w-3.5" />
                    Token ends with {invite.token.slice(-4)}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => setRevokeInviteId(invite._id)}
                    disabled={revokeInviteMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                    Revoke
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <AlertDialog
        open={!!revokeInviteId}
        onOpenChange={() => setRevokeInviteId(null)}
      >
        <AlertDialogContent className="max-w-md">
          <div className="mx-auto mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-6 w-6 text-destructive" />
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">
              Revoke invitation?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              This invitation will stop working immediately. Anyone with this
              link/email will no longer be able to join.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2">
            <AlertDialogCancel className="flex-1">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                revokeInviteId && handleRevokeInvite(revokeInviteId)
              }
              disabled={revokeInviteMutation.isPending}
              className="flex-1 bg-destructive hover:bg-destructive/90"
            >
              {revokeInviteMutation.isPending ? "Revoking..." : "Revoke"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default InvitationPage;
