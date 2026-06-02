"use client"

import {
  ListTodo,
  Building2,
  UserPlus,
  ArrowRight,
  ChevronRight,
  Briefcase,
  CheckCircle2,
  Circle
} from "lucide-react";
import { Add } from "iconsax-reactjs";

import useAuthStore from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

function AdminDashboard() {
  const { user } = useAuthStore()

  const hasCompany = false;

  return (
    <div className="min-h-screen bg-background max-w-7xl mx-auto p-6 space-y-8">
      <header className="space-y-1">
        <p className="text-sm text-muted-foreground font-medium">
          Sunday, January 25, 2026
        </p>
        <h1 className="text-3xl font-bold tracking-tight capitalize">
          Welcome to LeadXpert, {user?.name.split(" ")[0]}
        </h1>
        <p className="text-muted-foreground">
          Let's get your lead management pipeline up and running.
        </p>
      </header>

      {!hasCompany && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="flex flex-row items-center space-x-4">
            <div className="p-3 bg-primary rounded-lg text-primary-foreground">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <CardTitle>Create your Organization</CardTitle>
              <CardDescription>
                You haven't set up a company profile yet. You'll need this to manage leads and invite team members.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Button className="gap-2">
              Setup Company <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="group hover:border-primary/50 transition-all cursor-pointer overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-medium text-primary uppercase tracking-wider">
                    <Circle className="h-3 w-3 fill-primary" />
                    Set up the basics
                  </div>
                  <h3 className="text-xl font-bold">Create a new contact</h3>
                  <p className="text-sm text-muted-foreground italic">About 2 minutes</p>
                </div>
                <div className="p-2 bg-muted rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <UserPlus className="h-6 w-6" />
                </div>
              </div>

              <p className="text-muted-foreground text-sm">
                See all their details and interactions you've had in one place.
              </p>

              <div className="flex items-center justify-between pt-2">
                <Button variant="outline" className="font-semibold group-hover:bg-primary group-hover:text-primary-foreground">
                  Create contact
                </Button>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:border-primary/50 transition-all cursor-pointer overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    <CheckCircle2 className="h-3 w-3" />
                    Track your deals in one place
                  </div>
                  <h3 className="text-xl font-bold">Create a deal</h3>
                  <p className="text-sm text-muted-foreground italic">About 1 minute</p>
                </div>
                <div className="p-2 bg-muted rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Briefcase className="h-6 w-6" />
                </div>
              </div>

              <p className="text-muted-foreground text-sm">
                Use deals in LeadXpert to track potential revenue through your sales process.
              </p>

              <div className="flex items-center justify-between pt-2">
                <Button variant="outline" className="font-semibold group-hover:bg-primary group-hover:text-primary-foreground">
                  Create deal
                </Button>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="">
        <section className="space-y-4">
          <div className="flex justify-between space-x-2 text-foreground/80">
            <div className="flex items-center space-x-2 text-foreground/80">
              <ListTodo className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Today's Tasks</h2>
            </div>
            <div className="flex items-center space-x-2 text-foreground/80">
              <Add className="bg-forground/70" />
              <Tabs defaultValue="open" className="">
                <TabsList className=" bg-muted">
                  <TabsTrigger
                    value="open"
                    className="data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm px-4 py-1.5 transition-all"
                  >
                    <ListTodo className="h-4 w-4 mr-2" />
                    Open
                  </TabsTrigger>
                  <TabsTrigger
                    value="completed"
                    className="data-[state=active]:bg-background data-[state=active]:text-success data-[state=active]:shadow-sm px-4 py-1.5 transition-all"
                  >
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
            <h3 className="font-medium">No tasks scheduled</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Once you add leads, your daily follow-ups will appear here.
            </p>
            <Button variant="outline" className="hover:text-white" size="sm">
              Create First Task
            </Button>
          </Card>
        </section>
      </div >
    </div >
  )
}

export default AdminDashboard
