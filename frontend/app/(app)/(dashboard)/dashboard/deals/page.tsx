"use client";

import { useState } from "react";
import {
  Loader2,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  Clock,
} from "lucide-react";
import useWorkspaceStore from "@/store/workspace-store";
import { useGetAllDeals } from "@/features/deal/hooks/useGetAllDeals";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DealStatus } from "@/features/deal/types/deal-types";
import type { Deal as DealType } from "@/features/deal/types/deal-types";
import { formatDistanceToNow } from "date-fns";

type TabFilter = DealStatus | "ALL";

export default function DealsPage() {
  const workspace = useWorkspaceStore((s) => s.workspace);
  const workspaceId = workspace?.id ?? "";

  const [activeTab, setActiveTab] = useState<TabFilter>("ALL");

  const statusFilter = activeTab === "ALL" ? undefined : activeTab;
  const { data: deals, isLoading } = useGetAllDeals(
    workspaceId,
    statusFilter ? { status: statusFilter } : undefined,
  );

  const getStatusColor = (status: DealStatus) => {
    switch (status) {
      case "ACTIVE":
        return "bg-info/10 text-info border-info/20";
      case "COMPLETED":
        return "bg-success/10 text-success border-success/20";
      case "ON_HOLD":
        return "bg-warning/10 text-warning border-warning/20";
      case "REFUNDED":
        return "bg-error/10 text-error border-error/20";
      case "CANCELLED":
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const dealsArray = deals ?? [];
  const totalDeals = dealsArray.length;
  const activeCount = dealsArray.filter(
    (d: DealType) => d.status === "ACTIVE",
  ).length;
  const completedCount = dealsArray.filter(
    (d: DealType) => d.status === "COMPLETED",
  ).length;
  const totalValue = dealsArray.reduce(
    (sum: number, d: DealType) => sum + d.value,
    0,
  );

  const formatDate = (date: string | Date | null | undefined) => {
    if (!date) return "-";
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch {
      return "-";
    }
  };

  return (
    <div className="min-h-screen bg-background mx-auto p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Deals</h1>
        <p className="text-muted-foreground text-sm">
          Manage and track all your converted deals in one place.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Total"
          value={totalDeals}
          icon={TrendingUp}
          color="text-foreground"
        />
        <StatCard
          label="Active"
          value={activeCount}
          icon={Clock}
          color="text-info"
        />
        <StatCard
          label="Completed"
          value={completedCount}
          icon={CheckCircle2}
          color="text-success"
        />
        <StatCard
          label="Total Value"
          value={new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: dealsArray[0]?.currency || "USD",
            maximumFractionDigits: 0,
          }).format(totalValue)}
          icon={DollarSign}
          color="text-accent"
          isValue
        />
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as TabFilter)}
      >
        <TabsList>
          <TabsTrigger value="ALL">All</TabsTrigger>
          <TabsTrigger value="ACTIVE">Active</TabsTrigger>
          <TabsTrigger value="COMPLETED">Completed</TabsTrigger>
          <TabsTrigger value="ON_HOLD">On Hold</TabsTrigger>
          <TabsTrigger value="CANCELLED">Cancelled</TabsTrigger>
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : !dealsArray || dealsArray.length === 0 ? (
        <EmptyState activeTab={activeTab} />
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Deal</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Payment Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expected Close</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dealsArray.map((deal: DealType) => (
                <TableRow key={deal._id}>
                  <TableCell>
                    <div className="space-y-0.5">
                      <p className="font-medium text-sm">{deal.title}</p>
                      {deal.createdBy?.name && (
                        <p className="text-xs text-muted-foreground">
                          {deal.createdBy.name}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <DollarSign className="h-3.5 w-3.5 text-accent" />
                      <span className="font-semibold">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: deal.currency,
                          maximumFractionDigits: 0,
                        }).format(deal.value)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {deal.paymentType.replace(/_/g, " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-xs font-semibold ${getStatusColor(deal.status)}`}
                    >
                      {deal.status.replace(/_/g, " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {formatDate(deal.expectedEndDate)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  color,
  isValue,
}: {
  label: string;
  value: number | string;
  icon: React.ElementType;
  color: string;
  isValue?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
      <div className={`p-2 rounded-md bg-muted ${color}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p
          className={`${isValue ? "text-lg font-bold" : "text-2xl font-bold"}`}
        >
          {value}
        </p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function EmptyState({ activeTab }: { activeTab: TabFilter }) {
  const messages: Record<TabFilter, string> = {
    ALL: "No deals yet. Deals created from leads will appear here.",
    ACTIVE: "No active deals.",
    COMPLETED: "No completed deals yet.",
    ON_HOLD: "No deals on hold.",
    CANCELLED: "No cancelled deals.",
    REFUNDED: "",
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
      <div className="p-3 rounded-full bg-muted">
        <TrendingUp className="h-6 w-6 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">
          {messages[activeTab]}
        </p>
        <p className="text-xs text-muted-foreground/70">
          Convert some leads to create deals to get started.
        </p>
      </div>
    </div>
  );
}
