import {
  TrendingUp,
  Users,
  Trophy,
  XCircle,
  DollarSign,
  Star,
} from "lucide-react";

interface PipelineStats {
  totalLeads: number;
  openLeads: number;
  wonLeads: number;
  lostLeads: number;
  totalValue: number;
  wonValue: number;
}

function statsCards(stats: PipelineStats, formatValue: (value: number) => string) {
  return [
    {
      label: "Total Leads",
      value: stats.totalLeads,
      icon: Users,
      colorClass: "bg-blue-100 text-blue-600",
    },
    {
      label: "Open Leads",
      value: stats.openLeads,
      icon: TrendingUp,
      colorClass: "bg-amber-100 text-amber-600",
    },
    {
      label: "Won Leads",
      value: stats.wonLeads,
      icon: Trophy,
      colorClass: "bg-green-100 text-green-600",
    },
    {
      label: "Lost Leads",
      value: stats.lostLeads,
      icon: XCircle,
      colorClass: "bg-red-100 text-red-600",
    },
    {
      label: "Total Value",
      value: formatValue(stats.totalValue),
      icon: DollarSign,
      colorClass: "bg-purple-100 text-purple-600",
    },
    {
      label: "Won Value",
      value: formatValue(stats.wonValue),
      icon: Star,
      colorClass: "bg-emerald-100 text-emerald-600",
    },
  ]
}

export default statsCards

