"use client"

import { useState } from "react";
import {
  ListTodo,
  UserPlus,
  ArrowRight,
  ChevronRight,
  Briefcase,
  CheckCircle2,
  Users,
  TrendingUp,
  Clock,
  Target
} from "lucide-react";
import { Add } from "iconsax-reactjs";

import useAuthStore from "@/store/auth-store";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useGetUserWorkspaces from "@/features/workspace/hooks/useGetUserWorkspaces";
import WorkspaceJoinModal from "@/features/workspace/components/WorkspaceJoinModal";
import WorkspaceCreateModal from "@/features/workspace/components/CreateWorkspaceModal";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import useWorkspaceStore from "@/store/workspace-store";
import { WorkspaceMember } from "@/features/workspace/workspace-types";

function Dashboard() {
  const { user } = useAuthStore();
  const { data: workspaces, isLoading } = useGetUserWorkspaces();
  const [isCreateWorkspaceOpen, setIsCreateWorkspaceOpen] = useState<boolean>(false);
  const [isJoinWorkspaceOpen, setIsJoinWorkspaceOpen] = useState(false);
  const { activeWorkspaceSlug } = useWorkspaceStore();

  const currentWorkspace = workspaces?.data?.fullWorkspaces?.find(
    (w: WorkspaceMember) => w.workspace.slug === activeWorkspaceSlug
  );

  const hasWorkspaces = workspaces?.data?.usersWorkspaces && workspaces.data.usersWorkspaces.length > 0;
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-background max-w-7xl mx-auto p-6 space-y-8">
      <header className="space-y-1">
        <p className="text-sm  font-medium">
          {currentDate}
        </p>
        <h1 className="text-3xl font-bold tracking-tight capitalize">
          Welcome back, {user?.name.split(" ")[0]}
        </h1>
        {currentWorkspace && (
          <p className="text-muted-foreground">
            You're viewing <span className="font-medium text-foreground">{currentWorkspace.workspace.name}</span> workspace
          </p>
        )}
      </header>

      {!hasWorkspaces && !isLoading && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="flex flex-row items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-lg text-primary">
              <Users className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <CardTitle>Set up your Workspace</CardTitle>
              <CardDescription>
                Create a new workspace to start managing leads, or join an existing team workspace with an invite link.
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

      {hasWorkspaces && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Leads</p>
                  <p className="text-2xl font-bold">0</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Active Deals</p>
                  <p className="text-2xl font-bold">0</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Due Today</p>
                  <p className="text-2xl font-bold">0</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                  <p className="text-2xl font-bold">0%</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="group hover:border-primary/50 transition-all cursor-pointer">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-medium text-primary uppercase tracking-wider">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  Quick Start
                </div>
                <h3 className="text-xl font-bold">Add New Contact</h3>
                <p className="text-sm text-muted-foreground">About 2 minutes</p>
              </div>
              <div className="p-2 bg-muted rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <UserPlus className="h-6 w-6" />
              </div>
            </div>

            <p className="text-muted-foreground text-sm">
              Add leads manually and track all their interactions in one place.
            </p>

            <div className="flex items-center justify-between pt-2">
              <Button variant="outline" className="font-semibold group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                Add Contact
              </Button>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:border-primary/50 transition-all cursor-pointer">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <Target className="h-3 w-3" />
                  Track Revenue
                </div>
                <h3 className="text-xl font-bold">Create a Deal</h3>
                <p className="text-sm text-muted-foreground">About 1 minute</p>
              </div>
              <div className="p-2 bg-muted rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Briefcase className="h-6 w-6" />
              </div>
            </div>

            <p className="text-muted-foreground text-sm">
              Track potential revenue and move deals through your sales pipeline.
            </p>

            <div className="flex items-center justify-between pt-2">
              <Button variant="outline" className="font-semibold group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                Create Deal
              </Button>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
          </CardContent>
        </Card>
      </div>

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ListTodo className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Today's Tasks</h2>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="gap-2">
              <Add size={16} />
              New Task
            </Button>
            <Tabs defaultValue="open">
              <TabsList className="bg-muted">
                <TabsTrigger value="open" className="data-[state=active]:bg-background">
                  <ListTodo className="h-4 w-4 mr-2" />
                  Open
                </TabsTrigger>
                <TabsTrigger value="completed" className="data-[state=active]:bg-background">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Completed
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed">
          <div className="bg-muted rounded-full p-4 mb-4">
            <ListTodo className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-medium text-lg">No tasks scheduled</h3>
          <p className="text-sm text-muted-foreground mb-4 max-w-md">
            Once you add leads and deals, your follow-ups and tasks will appear here.
          </p>
          <Button variant="outline" size="sm" className="gap-2">
            <Add size={16} />
            Create First Task
          </Button>
        </Card>
      </section>

      <Dialog open={isCreateWorkspaceOpen} onOpenChange={setIsCreateWorkspaceOpen}>
        <WorkspaceCreateModal setIsCreateWorkspaceOpen={setIsCreateWorkspaceOpen} />
      </Dialog>

      <Dialog open={isJoinWorkspaceOpen} onOpenChange={setIsJoinWorkspaceOpen}>
        <WorkspaceJoinModal setIsJoinWorkspaceOpen={setIsJoinWorkspaceOpen} />
      </Dialog>
    </div>
  );
}

export default Dashboard;
