"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Circle,
  Clock,
  XCircle,
  Calendar,
  MoreHorizontal,
  Trash2,
  Loader2,
  ListTodo,
  Phone,
  Mail,
  MessageCircle,
  Video,
  Users,
  FileText,
  RotateCcw,
  UserPlus,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import getInitials from "@/utils/getInitials";
import useWorkspaceStore from "@/store/workspace-store";
import useGetAllTasks from "@/features/lead/hooks/useGetAllTasks";
import useCompleteTask from "@/features/lead/hooks/useCompleteTask";
import useDeleteTask from "@/features/lead/hooks/useDeleteTask";
import useUpdateTask from "@/features/lead/hooks/useUpdateTask";
import { useGetAllMembers } from "@/features/workspace/hooks/useGetAllMembers";
import type { Member } from "@/features/workspace/types/member-type";
import type {
  Task,
  TaskStatus,
  TaskType,
  TaskPriority,
} from "@/features/lead/types/task-types";

const statusConfig: Record<
  TaskStatus,
  { label: string; icon: React.ElementType; color: string }
> = {
  PENDING: {
    label: "Pending",
    icon: Circle,
    color: "text-muted-foreground",
  },
  IN_PROGRESS: {
    label: "In Progress",
    icon: Clock,
    color: "text-blue-500",
  },
  COMPLETED: {
    label: "Completed",
    icon: CheckCircle2,
    color: "text-green-500",
  },
  CANCELLED: {
    label: "Cancelled",
    icon: XCircle,
    color: "text-red-400",
  },
};

const priorityConfig: Record<
  TaskPriority,
  { label: string; badgeClass: string }
> = {
  LOW: {
    label: "Low",
    badgeClass: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
  MEDIUM: {
    label: "Medium",
    badgeClass: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  },
  HIGH: {
    label: "High",
    badgeClass: "bg-red-500/10 text-red-600 border-red-500/20",
  },
};

const typeIcons: Record<TaskType, React.ElementType> = {
  CALL: Phone,
  VIBER: MessageCircle,
  WHATSAPP: MessageCircle,
  EMAIL: Mail,
  MEETING: Users,
  FOLLOW_UP: RotateCcw,
  DEMO: Video,
  DOCUMENT: FileText,
  OTHER: ListTodo,
};

function formatRelativeDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return `${Math.abs(diffDays)}d overdue`;
  if (diffDays === 0) return "Due today";
  if (diffDays === 1) return "Due tomorrow";
  if (diffDays <= 7) return `Due in ${diffDays}d`;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function isDueSoon(dateStr: string | null | undefined): boolean {
  if (!dateStr) return false;
  const diffMs = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24)) <= 1 && diffMs >= 0;
}

function isOverdue(dateStr: string | null | undefined): boolean {
  if (!dateStr) return false;
  return new Date(dateStr) < new Date();
}

type TabFilter = "ALL" | TaskStatus;

export default function TasksPage() {
  const workspace = useWorkspaceStore((s) => s.workspace);
  const workspaceId = workspace?.id ?? "";
  const role = workspace?.role;
  const canAssign = role === "SUPER_ADMIN" || role === "ADMIN";

  const [activeTab, setActiveTab] = useState<TabFilter>("ALL");

  const statusFilter = activeTab === "ALL" ? undefined : activeTab;
  const { data: tasks, isLoading } = useGetAllTasks(
    workspaceId,
    statusFilter ? { status: statusFilter } : undefined,
  );
  const { data: membersData } = useGetAllMembers(workspaceId);
  const members: Member[] = Array.isArray(membersData)
    ? membersData
    : (membersData?.members ?? []);

  const completeMutation = useCompleteTask(workspaceId);
  const deleteMutation = useDeleteTask(workspaceId);
  const updateMutation = useUpdateTask(workspaceId);

  const handleComplete = (taskId: string) => completeMutation.mutate(taskId);
  const handleDelete = (taskId: string) => deleteMutation.mutate(taskId);
  const handleAssign = (taskId: string, userId: string | null) => {
    updateMutation.mutate({ taskId, data: { assignedTo: userId } });
  };

  const totalTasks = tasks?.length ?? 0;
  const pendingCount = tasks?.filter((t) => t.status === "PENDING").length ?? 0;
  const inProgressCount =
    tasks?.filter((t) => t.status === "IN_PROGRESS").length ?? 0;
  const completedCount =
    tasks?.filter((t) => t.status === "COMPLETED").length ?? 0;

  return (
    <div className="min-h-screen bg-background mx-auto p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Tasks</h1>
        <p className="text-muted-foreground text-sm">
          Manage and track all your workspace tasks in one place.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Total"
          value={totalTasks}
          icon={ListTodo}
          color="text-foreground"
        />
        <StatCard
          label="Pending"
          value={pendingCount}
          icon={Circle}
          color="text-muted-foreground"
        />
        <StatCard
          label="In Progress"
          value={inProgressCount}
          icon={Clock}
          color="text-blue-500"
        />
        <StatCard
          label="Completed"
          value={completedCount}
          icon={CheckCircle2}
          color="text-green-500"
        />
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as TabFilter)}
      >
        <TabsList>
          <TabsTrigger value="ALL">All</TabsTrigger>
          <TabsTrigger value="PENDING">Pending</TabsTrigger>
          <TabsTrigger value="IN_PROGRESS">In Progress</TabsTrigger>
          <TabsTrigger value="COMPLETED">Completed</TabsTrigger>
          <TabsTrigger value="CANCELLED">Cancelled</TabsTrigger>
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : !tasks || tasks.length === 0 ? (
        <EmptyState activeTab={activeTab} />
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10" />
                <TableHead>Task</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12.5" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TaskRow
                  key={task._id}
                  task={task}
                  onComplete={handleComplete}
                  onDelete={handleDelete}
                  onAssign={handleAssign}
                  members={members}
                  canAssign={canAssign}
                  isCompleting={
                    completeMutation.isPending &&
                    completeMutation.variables === task._id
                  }
                />
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function TaskRow({
  task,
  onComplete,
  onDelete,
  onAssign,
  members,
  canAssign,
  isCompleting,
}: {
  task: Task;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onAssign: (id: string, userId: string | null) => void;
  members: Member[];
  canAssign: boolean;
  isCompleting: boolean;
}) {
  const [assignOpen, setAssignOpen] = useState(false);
  const status = statusConfig[task.status];
  const priority = priorityConfig[task.priority];
  const TypeIcon = typeIcons[task.type] ?? ListTodo;
  const StatusIcon = status.icon;
  const done = task.status === "COMPLETED";
  const cancelled = task.status === "CANCELLED";
  const overdue = !done && !cancelled && isOverdue(task.dueDate);
  const dueSoon = !done && !cancelled && !overdue && isDueSoon(task.dueDate);

  return (
    <TableRow className={cn(done && "opacity-60", cancelled && "opacity-50")}>
      <TableCell>
        <button
          onClick={() => onComplete(task._id)}
          disabled={done || cancelled || isCompleting}
          className={cn(
            "flex items-center justify-center w-5 h-5 rounded-full border-2 transition-colors",
            done
              ? "border-green-500 bg-green-500 text-white"
              : "border-muted-foreground/40 hover:border-green-500 hover:bg-green-500/10",
            (done || cancelled) && "cursor-default",
          )}
          title={done ? "Completed" : "Mark as complete"}
        >
          {isCompleting ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : done ? (
            <CheckCircle2 className="h-3 w-3" />
          ) : null}
        </button>
      </TableCell>

      <TableCell>
        <div className="space-y-0.5 max-w-75">
          <p
            className={cn(
              "font-medium text-sm truncate",
              done && "line-through text-muted-foreground",
            )}
          >
            {task.title}
          </p>
          {task.description && (
            <p className="text-xs text-muted-foreground truncate">
              {task.description}
            </p>
          )}
        </div>
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <TypeIcon className="h-3.5 w-3.5" />
          <span className="text-xs capitalize">
            {task.type.replace(/_/g, " ").toLowerCase()}
          </span>
        </div>
      </TableCell>

      {/* Priority */}
      <TableCell>
        <Badge variant="outline" className={cn("text-xs", priority.badgeClass)}>
          {priority.label}
        </Badge>
      </TableCell>

      <TableCell>
        {task.dueDate ? (
          <div
            className={cn(
              "flex items-center gap-1 text-xs",
              overdue && "text-red-500 font-medium",
              dueSoon && "text-yellow-600 font-medium",
              !overdue && !dueSoon && "text-muted-foreground",
            )}
          >
            <Calendar className="h-3 w-3" />
            <span>{formatRelativeDate(task.dueDate)}</span>
          </div>
        ) : (
          <span className="text-xs text-muted-foreground/50">No due date</span>
        )}
      </TableCell>

      <TableCell>
        {canAssign && !done && !cancelled ? (
          <Popover open={assignOpen} onOpenChange={setAssignOpen}>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1 -mx-2 -my-1 transition-colors",
                  "hover:bg-muted cursor-pointer",
                )}
                title="Click to reassign"
              >
                {task.assignedTo ? (
                  <>
                    <Avatar size="sm">
                      <AvatarFallback className="text-[10px]">
                        {getInitials(task.assignedTo.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground truncate max-w-30">
                      {task.assignedTo.name}
                    </span>
                  </>
                ) : (
                  <span className="text-xs text-muted-foreground/50 flex items-center gap-1">
                    <UserPlus className="h-3 w-3" />
                    Assign
                  </span>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-52 p-1" align="start">
              <ScrollArea className="max-h-52">
                <div className="space-y-0.5">
                  <button
                    onClick={() => {
                      onAssign(task._id, null);
                      setAssignOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-2 rounded-md px-2 py-1.5 text-xs hover:bg-muted transition-colors text-left",
                      !task.assignedTo && "bg-muted font-medium",
                    )}
                  >
                    <div className="w-5 h-5 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                      <XCircle className="h-3 w-3 text-muted-foreground/50" />
                    </div>
                    <span className="text-muted-foreground">Unassigned</span>
                  </button>
                  {members.map((member) => {
                    const isCurrentAssignee =
                      task.assignedTo?._id === member.user.id;
                    return (
                      <button
                        key={member.user.id}
                        onClick={() => {
                          onAssign(task._id, member.user.id);
                          setAssignOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-2 rounded-md px-2 py-1.5 text-xs hover:bg-muted transition-colors text-left",
                          isCurrentAssignee && "bg-muted font-medium",
                        )}
                      >
                        <Avatar size="sm">
                          <AvatarFallback className="text-[10px]">
                            {getInitials(member.user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="truncate">{member.user.name}</p>
                          <p className="text-[10px] text-muted-foreground/70 truncate">
                            {member.role}
                          </p>
                        </div>
                        {isCurrentAssignee && (
                          <CheckCircle2 className="h-3 w-3 text-green-500 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>
        ) : task.assignedTo ? (
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <AvatarFallback className="text-[10px]">
                {getInitials(task.assignedTo.name)}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground truncate max-w-30">
              {task.assignedTo.name}
            </span>
          </div>
        ) : (
          <span className="text-xs text-muted-foreground/50">Unassigned</span>
        )}
      </TableCell>

      <TableCell>
        <div className={cn("flex items-center gap-1.5 text-xs", status.color)}>
          <StatusIcon className="h-3.5 w-3.5" />
          <span>{status.label}</span>
        </div>
      </TableCell>

      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {!done && !cancelled && (
              <>
                <DropdownMenuItem onClick={() => onComplete(task._id)}>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Mark Complete
                </DropdownMenuItem>
                {canAssign && (
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Assign To
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <ScrollArea className="max-h-52">
                        <DropdownMenuItem
                          onClick={() => onAssign(task._id, null)}
                        >
                          <XCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                          Unassigned
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {members.map((member) => (
                          <DropdownMenuItem
                            key={member.user.id}
                            onClick={() => onAssign(task._id, member.user.id)}
                          >
                            <Avatar size="sm" className="mr-2">
                              <AvatarFallback className="text-[10px]">
                                {getInitials(member.user.name)}
                              </AvatarFallback>
                            </Avatar>
                            {member.user.name}
                            {task.assignedTo?._id === member.user.id && (
                              <CheckCircle2 className="h-3 w-3 text-green-500 ml-auto" />
                            )}
                          </DropdownMenuItem>
                        ))}
                      </ScrollArea>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                )}
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem
              onClick={() => onDelete(task._id)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border bg-card p-4">
      <div className={cn("p-2 rounded-md bg-muted", color)}>
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function EmptyState({ activeTab }: { activeTab: TabFilter }) {
  const messages: Record<TabFilter, string> = {
    ALL: "No tasks yet. Tasks created from leads will appear here.",
    PENDING: "No pending tasks.",
    IN_PROGRESS: "No tasks in progress.",
    COMPLETED: "No completed tasks yet.",
    CANCELLED: "No cancelled tasks.",
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
      <div className="p-3 rounded-full bg-muted">
        <ListTodo className="h-6 w-6 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">
          {messages[activeTab]}
        </p>
        <p className="text-xs text-muted-foreground/70">
          Create tasks from lead cards in your pipeline to get started.
        </p>
      </div>
    </div>
  );
}
