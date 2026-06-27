"use client";

import { format, formatDistanceToNow } from "date-fns";
import { Clock, Mail, Calendar, Smartphone, LogOut } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useAuthStore from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/hooks/useLogout";

function AccountStatusPage() {
  const { user } = useAuthStore();
  const logoutMutation = useLogout();

  const mockData = {
    accountCreated: new Date("2024-01-15"),
    verified: true,
    twoFAEnabled: true,
    sessionsActive: 1,
  };

  const handleLogoutAllSessions = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Email Address
                </p>
                <p className="text-lg font-semibold text-foreground mt-2">
                  {user?.email}
                </p>
              </div>
              <Mail className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Account Created
                </p>
                <p className="text-lg font-semibold text-foreground mt-2">
                  {format(mockData.accountCreated, "MMM dd, yyyy")}
                </p>
              </div>
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Activity Status
          </CardTitle>
          <CardDescription>Your recent account activity</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between pb-4 border-b">
            <div>
              <p className="font-medium text-foreground">Last Login</p>
              <p className="text-sm text-muted-foreground">
                {user?.lastLoginAt
                  ? formatDistanceToNow(user.lastLoginAt, { addSuffix: true })
                  : "Never"}
              </p>
            </div>
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>

          <div className="flex items-center justify-between pb-4 border-b">
            <div>
              <p className="font-medium text-foreground">Active Sessions</p>
              <p className="text-sm text-muted-foreground">
                {mockData.sessionsActive} device
                {mockData.sessionsActive > 1 ? "s" : ""} currently logged in
              </p>
            </div>
            <Smartphone className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">2FA Status</p>
              <p className="text-sm text-muted-foreground">
                {mockData.twoFAEnabled ? "Enabled" : "Disabled"}
              </p>
            </div>
            <div
              className={`h-3 w-3 rounded-full ${mockData.twoFAEnabled ? "bg-green-500" : "bg-yellow-500"}`}
            />
          </div>

          <Button
            variant="outline"
            className="bg-primary text-primary-foreground mt-4 gap-2"
            onClick={handleLogoutAllSessions}
          >
            <LogOut className="h-4 w-4" />
            Logout All Other Sessions
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default AccountStatusPage;
