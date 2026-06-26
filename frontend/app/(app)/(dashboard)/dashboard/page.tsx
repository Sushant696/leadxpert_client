"use client";

import {
  ListTodo,
  ArrowRight,
  Briefcase,
  Users,
  TrendingUp,
  Clock,
  Circle,
  CheckCircle2,
  XCircle,
  CalendarClock,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

import useAuthStore from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import useWorkspaceStore from "@/store/workspace-store";
import { useJoinWorkspace } from "@/features/auth/hooks/useJoinWorkspace";
import WorkspaceJoinModal from "@/features/workspace/components/WorkspaceJoinModal";
import WorkspaceCreateModal from "@/features/workspace/components/CreateWorkspaceModal";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import useGetDashboardStats from "@/features/workspace/hooks/useGetDashboardStats";
import useGetAllTasks from "@/features/lead/hooks/useGetAllTasks";

function Dashboard() {
  type DashboardTask = {
    _id: string;
    title: string;
    description?: string | null;
    priority: "LOW" | "MEDIUM" | "HIGH";
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
    dueDate?: string | null;
  };

  const { user, token } = useAuthStore();
  const { workspace } = useWorkspaceStore();
  const [isJoinWorkspaceOpen, setIsJoinWorkspaceOpen] = useState(false);
  const [isCreateWorkspaceOpen, setIsCreateWorkspaceOpen] =
    useState<boolean>(false);
  const currentWorkspace = workspace;
  const isInviteTokenPresent = token?.token ? true : false;
  const [joinWorkspaceModal, setJoinWorkspaceModal] =
    useState(isInviteTokenPresent);

  const joinWorkspaceMutation = useJoinWorkspace(token?.token ?? "", () =>
    setJoinWorkspaceModal(false),
  );

  // Fetch dashboard stats
  const { data: dashboardStats, isLoading } = useGetDashboardStats(
    currentWorkspace?.id ?? "",
  );
  const { data: tasks = [], isLoading: isTasksLoading } = useGetAllTasks(
    currentWorkspace?.id ?? "",
    undefined,
  );

  // Calculate stats from the aggregated data
  const totalLeads = dashboardStats?.leads.total || 0;
  const activeDealCount = dashboardStats?.deals.byStatus.ACTIVE || 0;
  const dueTodayCount = dashboardStats?.tasks.dueToday || 0;
  const conversionRate = dashboardStats?.conversionRate.toFixed(1) || "0";
  const displayedTasks = [...(tasks as DashboardTask[])]
    .sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    })
    .slice(0, 5);

  const taskStatusConfig: Record<
    string,
    { label: string; icon: React.ElementType; className: string }
  > = {
    PENDING: {
      label: "Pending",
      icon: Circle,
      className: "text-muted-foreground",
    },
    IN_PROGRESS: {
      label: "In Progress",
      icon: Clock,
      className: "text-blue-500",
    },
    COMPLETED: {
      label: "Completed",
      icon: CheckCircle2,
      className: "text-green-500",
    },
    CANCELLED: {
      label: "Cancelled",
      icon: XCircle,
      className: "text-red-500",
    },
  };

  const taskPriorityDot: Record<string, string> = {
    HIGH: "bg-red-500",
    MEDIUM: "bg-yellow-500",
    LOW: "bg-blue-400",
  };

  const formatDueDate = (dueDate?: string | null) => {
    if (!dueDate) return "No due date";
    try {
      return formatDistanceToNow(new Date(dueDate), { addSuffix: true });
    } catch {
      return "No due date";
    }
  };

  const handleDialogChange = (open: boolean) => {
    setJoinWorkspaceModal(open);
    if (!open && token?.token) {
      useAuthStore.getState().setInviteToken({ token: "" });
    }
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background max-w-7xl mx-auto p-6 space-y-8">
      <header className="space-y-1">
        <p className="text-sm  font-medium">{currentDate}</p>
        <h1 className="text-3xl font-bold tracking-tight capitalize">
          Welcome back, {user?.name.split(" ")[0]}
        </h1>
        {currentWorkspace && (
          <p className="text-muted-foreground">
            You&apos;re viewing{" "}
            <span className="font-medium text-foreground">
              {currentWorkspace.name}
            </span>{" "}
            workspace
          </p>
        )}
      </header>

      {!currentWorkspace && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="flex flex-row items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-lg text-primary">
              <Users className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <CardTitle>Set up your Workspace</CardTitle>
              <CardDescription>
                Create a new workspace to start managing leads, or join an
                existing team workspace with an invite link.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Button
                className="gap-2"
                onClick={() => setIsCreateWorkspaceOpen(true)}
              >
                Create Workspace <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => setIsJoinWorkspaceOpen(true)}
              >
                Join Workspace <Users className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentWorkspace && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Leads
                  </p>
                  <p className="text-2xl font-bold">
                    {isLoading ? "..." : totalLeads}
                  </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Active Deals
                  </p>
                  <p className="text-2xl font-bold">
                    {isLoading ? "..." : activeDealCount}
                  </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Due Today
                  </p>
                  <p className="text-2xl font-bold">
                    {isLoading ? "..." : dueTodayCount}
                  </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Conversion Rate
                  </p>
                  <p className="text-2xl font-bold">
                    {isLoading ? "..." : `${conversionRate}%`}
                  </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ListTodo className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Today&apos;s Tasks</h2>
            {tasks.length > 0 && (
              <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                {tasks.length}
              </span>
            )}
          </div>
        </div>

        {isTasksLoading ? (
          <Card className="flex flex-col items-center justify-center p-12 text-center">
            <p className="text-sm text-muted-foreground">Loading tasks...</p>
          </Card>
        ) : tasks.length > 0 ? (
          <Card className="overflow-hidden">
            <div className="divide-y divide-border">
              {displayedTasks.map((task) => {
                const status = taskStatusConfig[task.status] ?? {
                  label: task.status,
                  icon: Circle,
                  className: "text-muted-foreground",
                };
                const StatusIcon = status.icon;
                const isDone =
                  task.status === "COMPLETED" || task.status === "CANCELLED";

                const dueDate = task.dueDate ? new Date(task.dueDate) : null;
                const now = new Date();
                const isOverdue = dueDate && dueDate < now && !isDone;
                const isDueToday =
                  dueDate &&
                  dueDate.toDateString() === now.toDateString() &&
                  !isDone;

                return (
                  <div
                    key={task._id}
                    className={cn(
                      "flex items-start gap-3 px-4 py-3.5 transition-colors hover:bg-muted/40",
                      isDone && "opacity-50",
                    )}
                  >
                    <div
                      className={cn(
                        "mt-0.5 shrink-0 flex items-center justify-center w-5 h-5 rounded-full border-2 transition-colors",
                        task.status === "COMPLETED"
                          ? "border-green-500 bg-green-500 text-white"
                          : task.status === "CANCELLED"
                            ? "border-red-400 bg-red-400/10 text-red-400"
                            : task.status === "IN_PROGRESS"
                              ? "border-blue-500 bg-blue-500/10 text-blue-500"
                              : "border-muted-foreground/30",
                      )}
                    >
                      <StatusIcon className="h-3 w-3" />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p
                          className={cn(
                            "text-sm font-medium leading-none truncate",
                            isDone && "line-through text-muted-foreground",
                          )}
                        >
                          {task.title}
                        </p>
                        <span
                          className={cn(
                            "shrink-0 inline-block w-1.5 h-1.5 rounded-full",
                            taskPriorityDot[task.priority] ??
                              "bg-muted-foreground",
                          )}
                        />
                      </div>
                      {task.description && (
                        <p className="text-xs text-muted-foreground truncate">
                          {task.description}
                        </p>
                      )}
                    </div>

                    <div className="shrink-0 flex items-center gap-1.5">
                      {isOverdue ? (
                        <div className="flex items-center gap-1 text-xs font-medium text-red-500 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full">
                          <AlertCircle className="h-3 w-3" />
                          Overdue
                        </div>
                      ) : isDueToday ? (
                        <div className="flex items-center gap-1 text-xs font-medium text-yellow-600 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-full">
                          <CalendarClock className="h-3 w-3" />
                          Due today
                        </div>
                      ) : dueDate ? (
                        <span className="text-xs text-muted-foreground">
                          {formatDueDate(task.dueDate)}
                        </span>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>

            {tasks.length > 5 && (
              <div className="px-4 py-2.5 border-t bg-muted/20 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Showing 5 of {tasks.length} tasks
                </p>
              </div>
            )}
          </Card>
        ) : (
          <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed">
            <div className="bg-muted rounded-full p-4 mb-4">
              <ListTodo className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-medium text-lg">No tasks scheduled</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              Once you add leads and deals, your follow-ups and tasks will
              appear here.
            </p>
          </Card>
        )}
      </section>

      <Dialog open={joinWorkspaceModal} onOpenChange={handleDialogChange}>
        <DialogContent className="max-w-lg sm:max-w-md m-2">
          <DialogHeader>
            <DialogTitle className="text-2xl">Join a Workspace</DialogTitle>
            <DialogDescription>
              You&apos;ve been invited to join a workspace. Click below to
              accept the invitation.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Button
              variant="default"
              className="w-full mb-4"
              onClick={() => joinWorkspaceMutation.mutate()}
              disabled={joinWorkspaceMutation.isPending}
            >
              {joinWorkspaceMutation.isPending
                ? "Joining..."
                : "Join Workspace"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={isCreateWorkspaceOpen}
        onOpenChange={setIsCreateWorkspaceOpen}
      >
        <WorkspaceCreateModal
          setIsCreateWorkspaceOpen={setIsCreateWorkspaceOpen}
        />
      </Dialog>

      <Dialog open={isJoinWorkspaceOpen} onOpenChange={setIsJoinWorkspaceOpen}>
        <WorkspaceJoinModal setIsJoinWorkspaceOpen={setIsJoinWorkspaceOpen} />
      </Dialog>
    </div>
  );
}

export default Dashboard;
