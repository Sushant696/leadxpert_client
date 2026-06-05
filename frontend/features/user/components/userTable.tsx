'use client'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Trash2,
  Eye,
  Users,
  CheckCircle2,
  Clock
} from "lucide-react"
import { User } from "@/features/user/user-types"

interface UserTableProps {
  users: User[]
  searchQuery: string
  setIsViewModalOpen: (isOpen: boolean) => void
  setSelectedUser: (user: User | null) => void
  handleDeleteClick: (user: User) => void
}

function UserTable({
  users,
  searchQuery,
  setIsViewModalOpen,
  setSelectedUser,
  handleDeleteClick,
}: UserTableProps) {
  const handleViewUser = (user: User) => {
    setSelectedUser(user)
    setIsViewModalOpen(true)
  }
  const filteredUsers = users.filter((user: User) =>
    user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
    <div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="font-semibold">User</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Role</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Joined</TableHead>
                <TableHead className="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12">
                    <div className="flex flex-col items-center gap-2">
                      <Users className="w-12 h-12 text-muted-foreground/50" />
                      <p className="text-sm text-muted-foreground">No users found</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user: User) => (
                  <TableRow
                    key={user._id}
                    className="hover:bg-muted/20 transition-colors cursor-pointer"
                    onClick={() => handleViewUser(user)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {user.profilePicture ? (
                          <img
                            src={user.profilePicture}
                            alt={user.name}
                            className="w-9 h-9 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-primary-foreground font-semibold text-sm">
                            {user.name?.charAt(0).toUpperCase() || 'U'}
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-sm">{user.name}</p>
                          {!user.onboardingCompleted && (
                            <p className="text-xs text-warning flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Onboarding pending
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{user.email}</span>
                        {user.isEmailVerified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getRoleBadgeColor(user.role)}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          user.isActive
                            ? 'bg-success/10 text-success border-success/20'
                            : 'bg-muted text-muted-foreground border-border'
                        }
                      >
                        {user.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleViewUser(user)
                          }}
                          className="h-8 px-2"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteClick(user)
                          }}
                          className="h-8 px-2 text-error hover:text-error hover:bg-error/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>


    </div>
  )
}

export default UserTable
