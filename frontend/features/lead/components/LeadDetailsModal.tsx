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
  Calendar,
  DollarSign,
  Flag,
  Mail,
  Phone,
  User,
  Clock,
  Tag,
  FileText,
  Activity,
  CheckSquare,
  AlertCircle,
  TrendingUp,
  UserCheck,
  MessageSquare,
} from "lucide-react";
import { Lead } from "../types/lead-types";
import { cn } from "@/lib/utils";

interface LeadDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  workspaceId: string;
  pipelineId: string;
}

const priorityConfig = {
  LOW: { color: "bg-blue-500/10 text-blue-700 border-blue-200", label: "Low", icon: Flag },
  MEDIUM: { color: "bg-yellow-500/10 text-yellow-700 border-yellow-200", label: "Medium", icon: Flag },
  HIGH: { color: "bg-orange-500/10 text-orange-700 border-orange-200", label: "High", icon: Flag },
  URGENT: { color: "bg-red-500/10 text-red-700 border-red-200", label: "Urgent", icon: AlertCircle },
};

const statusConfig = {
  OPEN: { color: "bg-green-500/10 text-green-700 border-green-200", label: "Open" },
  CONTACTED: { color: "bg-blue-500/10 text-blue-700 border-blue-200", label: "Contacted" },
  QUALIFIED: { color: "bg-purple-500/10 text-purple-700 border-purple-200", label: "Qualified" },
  LOST: { color: "bg-gray-500/10 text-gray-700 border-gray-200", label: "Lost" },
};

const sourceLabels = {
  WEBSITE: "Website",
  REFERRAL: "Referral",
  COLD_CALL: "Cold Call",
  EMAIL: "Email",
  SOCIAL_MEDIA: "Social Media",
  EVENT: "Event",
  OTHER: "Other",
};

export function LeadDetailsModal({
  isOpen,
  onClose,
  lead,
  workspaceId: _workspaceId,
  pipelineId: _pipelineId,
}: LeadDetailsModalProps) {
  if (!lead) return null;

  const priority = priorityConfig[lead.priority];
  const status = statusConfig[lead.status];
  const PriorityIcon = priority.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold">
                {lead.title}
              </DialogTitle>
              <DialogDescription className="mt-1">
                Lead #{lead._id.slice(-6)}
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={cn("text-xs px-2 py-1", priority.color)}
              >
                <PriorityIcon size={12} className="mr-1" />
                {priority.label}
              </Badge>
              <Badge
                variant="outline"
                className={cn("text-xs px-2 py-1", status.color)}
              >
                {status.label}
              </Badge>
              {lead.isConverted && (
                <Badge variant="default" className="text-xs px-2 py-1">
                  Converted
                </Badge>
              )}
              {lead.isRotten && (
                <Badge variant="destructive" className="text-xs px-2 py-1">
                  Rotten
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="md:col-span-2 space-y-6">
            {/* Contact Information */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
                <User size={14} />
                Contact Information
              </h3>
              {lead.contactId ? (
                <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                      {lead.contactId.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-primary">
                        {lead.contactId.name}
                      </p>
                      {lead.contactId.email && (
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Mail size={12} />
                          <span>{lead.contactId.email}</span>
                        </div>
                      )}
                      {lead.contactId.phone && (
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Phone size={12} />
                          <span>{lead.contactId.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground italic">
                    No contact assigned to this lead
                  </p>
                </div>
              )}
            </div>

            {/* Lead Value */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
                <DollarSign size={14} />
                Lead Value
              </h3>
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <p className="text-3xl font-bold text-accent">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: lead.currency,
                    maximumFractionDigits: 0,
                  }).format(lead.value)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Currency: {lead.currency}
                </p>
              </div>
            </div>

            {/* Quick Note */}
            {lead.quickNote && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
                  <FileText size={14} />
                  Quick Note
                </h3>
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {lead.quickNote}
                  </p>
                </div>
              </div>
            )}

            {/* Tags */}
            {lead.tags.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
                  <Tag size={14} />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {lead.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs px-3 py-1"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-6">
            {/* Lead Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">
                Details
              </h3>

              {lead.source && (
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Source
                  </p>
                  <p className="text-sm font-medium flex items-center gap-2">
                    <TrendingUp size={12} className="text-muted-foreground" />
                    {sourceLabels[lead.source]}
                  </p>
                </div>
              )}

              {lead.assignedTo && (
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Assigned To
                  </p>
                  <div className="flex items-center gap-2">
                    <UserCheck size={12} className="text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">
                        {lead.assignedTo.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {lead.assignedTo.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <Separator />

              {/* Dates */}
              {lead.nextFollowUpAt && (
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Next Follow-up
                  </p>
                  <div className="flex items-center gap-2">
                    <Calendar size={12} className="text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {new Date(lead.nextFollowUpAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>
                </div>
              )}

              {lead.lastContactedAt && (
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Last Contacted
                  </p>
                  <div className="flex items-center gap-2">
                    <Clock size={12} className="text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {new Date(lead.lastContactedAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Created At
                </p>
                <div className="flex items-center gap-2">
                  <Calendar size={12} className="text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {new Date(lead.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <Separator />

              {/* Activity Counts */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Activity size={12} />
                    <span>Activities</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {lead.activityCount}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckSquare size={12} />
                    <span>Tasks</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {lead.taskCount}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MessageSquare size={12} />
                    <span>Notes</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {lead.noteCount}
                  </Badge>
                </div>
              </div>

              {/* ML Score */}
              {lead.mlScore > 0 && (
                <>
                  <Separator />
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      ML Score
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-accent transition-all"
                          style={{ width: `${lead.mlScore}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-accent">
                        {lead.mlScore}%
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <Separator />

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="default">Edit Lead</Button>
          <Button variant="default">Convert to Deal</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
