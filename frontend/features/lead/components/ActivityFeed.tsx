"use client";

import { formatDistanceToNow } from "date-fns";
import type { LucideIcon } from "lucide-react";
import {
  Activity as ActivityIcon,
  ArrowRightLeft,
  Flag,
  Pencil,
  Repeat,
  Tag,
  UserCheck,
  UserMinus,
  XCircle,
} from "lucide-react";

import useGetActivities from "../hooks/useGetActivities";
import { Activity, ActivityType } from "../types/activity-types";

interface ActivityFeedProps {
  workspaceId: string;
  leadId: string;
}

const activityIcons: Partial<Record<ActivityType, LucideIcon>> = {
  LEAD_CREATED: ActivityIcon,
  LEAD_UPDATED: Pencil,
  STAGE_CHANGED: ArrowRightLeft,
  STATUS_CHANGED: ArrowRightLeft,
  ASSIGNED: UserCheck,
  UNASSIGNED: UserMinus,
  PRIORITY_CHANGED: Flag,
  LEAD_CONVERTED: Repeat,
  LEAD_LOST: XCircle,
  TAG_ADDED: Tag,
  TAG_REMOVED: Tag,
};

function ActivityRow({
  activity,
  isLast,
}: {
  activity: Activity;
  isLast: boolean;
}) {
  const Icon = activityIcons[activity.type] ?? ActivityIcon;

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center shrink-0">
        <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center shrink-0">
          <Icon size={13} className="text-muted-foreground" />
        </div>
        {!isLast && <div className="w-px flex-1 bg-border mt-1" />}
      </div>
      <div className="flex-1 min-w-0 pb-4">
        <p className="text-sm">
          {activity.description ?? activity.type.replace(/_/g, " ")}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {activity.performedBy?.name ?? "Someone"} ·{" "}
          {formatDistanceToNow(new Date(activity.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
    </div>
  );
}

export function ActivityFeed({ workspaceId, leadId }: ActivityFeedProps) {
  const { data: activities = [], isLoading } = useGetActivities(
    workspaceId,
    "LEAD",
    leadId,
  );

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading activity…</p>;
  }

  if (activities.length === 0) {
    return (
      <p className="text-sm text-muted-foreground italic">No activity yet.</p>
    );
  }

  return (
    <div>
      {activities.map((activity, index) => (
        <ActivityRow
          key={activity._id}
          activity={activity}
          isLast={index === activities.length - 1}
        />
      ))}
    </div>
  );
}
