import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Trash2,
  Calendar,
  Shield,
  CheckCircle2,
  XCircle,
  Clock
} from "lucide-react"
import { User } from "../user-types"

interface UserDetailsDialogProps {
  isViewModalOpen: boolean
  setIsViewModalOpen: (isOpen: boolean) => void
  selectedUser: User | null,
}

function UserDetailsDialog({ isViewModalOpen, selectedUser, setIsViewModalOpen }: UserDetailsDialogProps) {

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-primary/10 text-primary border-primary/20'
      case 'manager':
        return 'bg-secondary/10 text-secondary border-secondary/20'
      default:
        return 'bg-muted text-muted-foreground border-border'
    }
  }
  return (
    <div className="">
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="!max-w-4xl w-[90vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              View and manage user information
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-6">
              {/* Profile Section */}
              <div className="flex items-start gap-4">
                {selectedUser.profilePicture ? (
                  <img
                    src={selectedUser.profilePicture}
                    alt={selectedUser.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-primary-foreground font-bold text-2xl">
                    {selectedUser.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
                <div className="flex-1 space-y-1">
                  <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    {selectedUser.email}
                    {selectedUser.isEmailVerified && (
                      <CheckCircle2 className="w-4 h-4 text-success" />
                    )}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline" className={getRoleBadgeColor(selectedUser.role)}>
                      <Shield className="w-3 h-3 mr-1" />
                      {selectedUser.role}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={
                        selectedUser.isActive
                          ? 'bg-success/10 text-success border-success/20'
                          : 'bg-muted text-muted-foreground border-border'
                      }
                    >
                      {selectedUser.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Email Verified
                  </p>
                  <div className="flex items-center gap-2">
                    {selectedUser.isEmailVerified ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        <span className="text-sm font-medium">Verified</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-error" />
                        <span className="text-sm font-medium">Not Verified</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Onboarding Status
                  </p>
                  <div className="flex items-center gap-2">
                    {selectedUser.onboardingCompleted ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        <span className="text-sm font-medium">Completed</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-4 h-4 text-warning" />
                        <span className="text-sm font-medium">Pending</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Member Since
                  </p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {new Date(selectedUser.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Last Updated
                  </p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {new Date(selectedUser.updatedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    User ID
                  </p>
                  <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                    {selectedUser._id}
                  </code>
                </div>
              </div>

              <Separator />

              {/* Actions */}
              <DialogFooter className="gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsViewModalOpen(false)}
                >
                  Close
                </Button>
                <Button
                  variant="outline"
                  className="border-error text-error hover:bg-error/10 hover:text-error"
                  onClick={() => {
                    // handleDeleteClick(selectedUser)
                  }}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete User
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>


    </div>
  )
}

export default UserDetailsDialog
