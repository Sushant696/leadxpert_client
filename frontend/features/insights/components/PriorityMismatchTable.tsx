"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import useGetPriorityMismatch from "../hooks/useGetPriorityMismatch";
import { PriorityMismatchLead } from "../insights-types";

type SortKey = "title" | "mlScore" | "mlPriority" | "humanPriority" | "value";
type SortDir = "asc" | "desc";

const priorityColor: Record<string, string> = {
  LOW: "bg-blue-500/10 text-blue-700 border-blue-200",
  MEDIUM: "bg-yellow-500/10 text-yellow-700 border-yellow-200",
  HIGH: "bg-orange-500/10 text-orange-700 border-orange-200",
  URGENT: "bg-red-500/10 text-red-700 border-red-200",
};

function SortHeader({
  label,
  active,
  dir,
  onClick,
}: {
  label: string;
  active: boolean;
  dir: SortDir;
  onClick: () => void;
}) {
  const Icon = !active ? ArrowUpDown : dir === "asc" ? ArrowUp : ArrowDown;
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 font-medium text-muted-foreground hover:text-foreground transition-colors"
    >
      {label}
      <Icon size={11} className={active ? "text-foreground" : "text-muted-foreground/50"} />
    </button>
  );
}

export function PriorityMismatchTable({ workspaceId }: { workspaceId: string }) {
  const { data = [], isLoading } = useGetPriorityMismatch(workspaceId);
  const [sortKey, setSortKey] = useState<SortKey>("mlScore");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const sorted = useMemo(() => {
    const rows = [...data];
    rows.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp =
        typeof av === "number" && typeof bv === "number"
          ? av - bv
          : String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });
    return rows;
  }, [data, sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading priority mismatches…</p>;
  }

  if (data.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic">
        No mismatches — the model and reps agree on every scored, open lead.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-1.5 pr-3">
              <SortHeader
                label="Lead"
                active={sortKey === "title"}
                dir={sortDir}
                onClick={() => handleSort("title")}
              />
            </th>
            <th className="text-left py-1.5 pr-3">
              <SortHeader
                label="ML priority"
                active={sortKey === "mlPriority"}
                dir={sortDir}
                onClick={() => handleSort("mlPriority")}
              />
            </th>
            <th className="text-left py-1.5 pr-3">
              <SortHeader
                label="Rep priority"
                active={sortKey === "humanPriority"}
                dir={sortDir}
                onClick={() => handleSort("humanPriority")}
              />
            </th>
            <th className="text-right py-1.5 pr-3">
              <SortHeader
                label="Score"
                active={sortKey === "mlScore"}
                dir={sortDir}
                onClick={() => handleSort("mlScore")}
              />
            </th>
            <th className="text-left py-1.5 text-muted-foreground font-medium">Assigned to</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((lead: PriorityMismatchLead) => (
            <tr key={lead.leadId} className="border-b border-border/50 last:border-0">
              <td className="py-2 pr-3">
                <p className="font-medium text-foreground truncate max-w-[220px]">{lead.title}</p>
                {lead.contactName && (
                  <p className="text-[11px] text-muted-foreground truncate max-w-[220px]">
                    {lead.contactName}
                  </p>
                )}
              </td>
              <td className="py-2 pr-3">
                <Badge
                  variant="outline"
                  className={cn("text-[10px] px-1.5 py-0", priorityColor[lead.mlPriority])}
                >
                  {lead.mlPriority}
                </Badge>
              </td>
              <td className="py-2 pr-3">
                <Badge
                  variant="outline"
                  className={cn("text-[10px] px-1.5 py-0", priorityColor[lead.humanPriority])}
                >
                  {lead.humanPriority}
                </Badge>
              </td>
              <td className="py-2 pr-3 text-right font-medium text-foreground">{lead.mlScore}</td>
              <td className="py-2 text-muted-foreground">{lead.assignedToName ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
