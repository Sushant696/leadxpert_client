import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  Calendar,
  DollarSign,
  Flag,
  User,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { Lead } from "../types/lead-types";
import { cn } from "@/lib/utils";
import { ScoreBadge } from "./ScoreBadge";
import { useRouter } from "next/navigation";

interface LeadDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead;
  workspaceId: string;
  pipelineId: string;
}

const priorityConfig = {
  LOW: {
    color: "bg-blue-500/10 text-blue-700 border-blue-200",
    label: "Low",
    icon: Flag,
  },
  MEDIUM: {
    color: "bg-yellow-500/10 text-yellow-700 border-yellow-200",
    label: "Medium",
    icon: Flag,
  },
  HIGH: {
    color: "bg-orange-500/10 text-orange-700 border-orange-200",
    label: "High",
    icon: Flag,
  },
  URGENT: {
    color: "bg-red-500/10 text-red-700 border-red-200",
    label: "Urgent",
    icon: AlertCircle,
  },
};

const statusConfig = {
  OPEN: {
    color: "bg-green-500/10 text-green-700 border-green-200",
    label: "Open",
  },
  CONTACTED: {
    color: "bg-blue-500/10 text-blue-700 border-blue-200",
    label: "Contacted",
  },
  QUALIFIED: {
    color: "bg-purple-500/10 text-purple-700 border-purple-200",
    label: "Qualified",
  },
  LOST: {
    color: "bg-gray-500/10 text-gray-700 border-gray-200",
    label: "Lost",
  },
};

const sourceLabels: Record<string, string> = {
  WEBSITE: "Website",
  REFERRAL: "Referral",
  COLD_CALL: "Cold Call",
  EMAIL: "Email",
  SOCIAL_MEDIA: "Social Media",
  EVENT: "Event",
  OTHER: "Other",
};

// Lightweight preview of a lead. Shows only the essentials — the full record
// (ML score panel, notes, tags, stats, actions) lives on the dedicated detail
// page reached via "View Full Details".
export function LeadDetailsModal({
  isOpen,
  onClose,
  lead,
}: LeadDetailsModalProps) {
  const router = useRouter();

  if (!lead) return null;

  const priority = priorityConfig[lead.priority];
  const status = statusConfig[lead.status];
  const PriorityIcon = priority.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex flex-col gap-2">
            <DialogTitle className="text-lg sm:text-xl font-bold pr-6">
              {lead.title}
            </DialogTitle>
            <DialogDescription>Lead #{lead._id.slice(-6)}</DialogDescription>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Badge
                variant="outline"
                className={cn("text-xs px-2 py-0.5", priority.color)}
              >
                <PriorityIcon size={11} className="mr-1" />
                {priority.label}
              </Badge>
              <Badge
                variant="outline"
                className={cn("text-xs px-2 py-0.5", status.color)}
              >
                {status.label}
              </Badge>
              <ScoreBadge
                mlScore={lead.mlScore}
                mlPriority={lead.mlPriority ?? null}
              />
              {lead.isConverted && (
                <Badge variant="default" className="text-xs px-2 py-0.5">
                  Converted
                </Badge>
              )}
              {lead.isRotten && (
                <Badge variant="destructive" className="text-xs px-2 py-0.5">
                  Rotten
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <Separator />

        {/* Basic details only */}
        <div className="space-y-3">
          {/* Contact */}
          <div className="flex items-center gap-2 text-sm">
            <User size={14} className="text-muted-foreground shrink-0" />
            <span className="text-muted-foreground">Contact:</span>
            <span className="font-medium truncate">
              {lead.contactId?.name ?? "—"}
            </span>
          </div>

          {/* Value + Source side by side, stacks on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-muted/30 rounded-lg p-3">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                <DollarSign size={12} />
                Value
              </div>
              <p className="text-lg font-bold text-accent">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: lead.currency,
                  maximumFractionDigits: 0,
                }).format(lead.value)}
              </p>
            </div>
            <div className="bg-muted/30 rounded-lg p-3">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                <TrendingUp size={12} />
                Source
              </div>
              <p className="text-sm font-medium">
                {lead.source ? sourceLabels[lead.source] ?? lead.source : "—"}
              </p>
            </div>
          </div>

          {/* Follow-up */}
          {lead.nextFollowUpAt && (
            <div className="flex items-center gap-2 text-sm">
              <Calendar size={14} className="text-muted-foreground shrink-0" />
              <span className="text-muted-foreground">Follow-up:</span>
              <span className="font-medium">
                {new Date(lead.nextFollowUpAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          )}
        </div>

        <Separator />

        <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Close
          </Button>
          <Button
            onClick={() => router.push(`/dashboard/leads/${lead._id}`)}
            className="w-full sm:w-auto"
          >
            View Full Details
            <ArrowRight size={14} />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
