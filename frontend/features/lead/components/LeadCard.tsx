import {
  DollarSign,
  Flag,
  Calendar,
  MessageSquare,
  CheckSquare,
} from "lucide-react";
import { Lead } from "../types/lead-types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface LeadCardProps {
  lead: Lead;
  onClick: () => void;
}

const priorityConfig = {
  LOW: { color: "bg-blue-500/10 text-blue-600" },
  MEDIUM: { color: "bg-yellow-500/10 text-yellow-600" },
  HIGH: { color: "bg-orange-500/10 text-orange-600" },
  URGENT: { color: "bg-red-500/10 text-red-600" },
};

export function LeadCard({ lead, onClick }: LeadCardProps) {
  const priority = priorityConfig[lead.priority];

  return (
    <div
      onClick={onClick}
      className="group bg-card border border-border rounded-lg p-3 hover:shadow-md hover:border-primary/50 transition-all cursor-pointer space-y-2"
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-semibold text-foreground line-clamp-2 flex-1">
          {lead.title}
        </h4>
        <Badge
          variant="outline"
          className={cn("text-xs shrink-0 px-2 py-0.5", priority.color)}
        >
          <Flag size={10} className="mr-1" />
          {lead.priority}
        </Badge>
      </div>

      {lead.contactId && (
        <p className="text-xs text-muted-foreground truncate">
          👤 {lead.contactId.name}
        </p>
      )}

      <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
        {lead.nextFollowUpAt ? (
          <div className="flex items-center gap-1">
            <Calendar size={11} />
            <span>
              {new Date(lead.nextFollowUpAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        ) : (
          <span className="text-muted-foreground/50">No follow-up</span>
        )}

        <div className="flex items-center gap-2">
          {lead.noteCount > 0 && (
            <div className="flex items-center gap-0.5">
              <MessageSquare size={11} />
              <span>{lead.noteCount}</span>
            </div>
          )}
          {lead.taskCount > 0 && (
            <div className="flex items-center gap-0.5">
              <CheckSquare size={11} />
              <span>{lead.taskCount}</span>
            </div>
          )}
        </div>
      </div>

      {lead.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {lead.tags.slice(0, 2).map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-[10px] px-1.5 py-0 font-normal"
            >
              {tag}
            </Badge>
          ))}
          {lead.tags.length > 2 && (
            <Badge
              variant="secondary"
              className="text-[10px] px-1.5 py-0 font-normal text-muted-foreground"
            >
              +{lead.tags.length - 2}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
