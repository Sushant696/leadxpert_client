import { useMemo } from "react"
import { MoreVertical, Shield, UserCog, UserMinus, Crown, Mail } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import useAuthStore from "@/store/auth-store"
import { Member } from "../types/member-type"
import { Button } from "@/components/ui/button"
import { RESOURCE_BASED_ROLES } from "@/types/user"
import { useUpdateRole } from "../hooks/useUpdateRole"
import useWorkspaceStore from "@/store/workspace-store"
import { useGetAllMembers } from "../hooks/useGetAllMembers"
import { useRemoveWorkspaceUser } from "../hooks/useRemoveWorkspaceUser"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function MembersList() {
  const { workspace } = useWorkspaceStore()
  const { user: currentUser } = useAuthStore()

  const { data: members, isLoading, isError } = useGetAllMembers(workspace?.id)
  const updateMemberRoleMutation = useUpdateRole()
  const removeMemberMutation = useRemoveWorkspaceUser()

  const currentUserId = currentUser?.id

  const currentMember = useMemo(() => {
    if (!members || !currentUserId) return null
    return members.find((m: Member) => m.user._id === currentUserId || m.user.id === currentUserId) ?? null
  }, [members, currentUserId])

  const getUserId = (member: Member): string => member.user._id || member.user.id

  const canManageMember = (targetMember: Member): boolean => {
    if (!currentMember) return false
    if (getUserId(targetMember) === currentUserId) return false

    if (currentMember.role === RESOURCE_BASED_ROLES.SUPER_ADMIN) return true

    if (currentMember.role === RESOURCE_BASED_ROLES.ADMIN) {
      return targetMember.role === RESOURCE_BASED_ROLES.AGENT
    }

    return false
  }

  const canPromote = (targetMember: Member): boolean => {
    if (!currentMember) return false

    const isSuperAdmin = currentMember.role === RESOURCE_BASED_ROLES.SUPER_ADMIN
    const isAdmin = currentMember.role === RESOURCE_BASED_ROLES.ADMIN
    const targetIsAgent = targetMember.role === RESOURCE_BASED_ROLES.AGENT

    return (isSuperAdmin || isAdmin) && targetIsAgent
  }

  const canDemote = (targetMember: Member): boolean => {
    if (!currentMember) return false

    return (
      currentMember.role === RESOURCE_BASED_ROLES.SUPER_ADMIN &&
      targetMember.role === RESOURCE_BASED_ROLES.ADMIN
    )
  }

  const canRemove = (targetMember: Member): boolean => {
    if (!currentMember) return false
    if (getUserId(targetMember) === currentUserId) return false

    if (currentMember.role === RESOURCE_BASED_ROLES.SUPER_ADMIN) return true

    return false
  }

  const handlePromote = (member: Member) => {
    updateMemberRoleMutation.mutate({
      workspaceId: member.workspaceId,
      data: {
        userId: getUserId(member),
        role: RESOURCE_BASED_ROLES.ADMIN
      }
    })
  }

  const handleDemote = (member: Member) => {
    updateMemberRoleMutation.mutate({
      workspaceId: member.workspaceId,
      data: {
        userId: getUserId(member),
        role: RESOURCE_BASED_ROLES.AGENT
      }
    })
  }

  const handleRemove = (member: Member) => {
    if (confirm(`Are you sure you want to remove ${member.user.name}?`)) {
      removeMemberMutation.mutate({
        workspaceId: member.workspaceId,
        userId: getUserId(member)
      })
    }
  }

  const getRoleBadgeColor = (role: RESOURCE_BASED_ROLES): string => {
    switch (role) {
      case RESOURCE_BASED_ROLES.SUPER_ADMIN: return "bg-primary text-primary-foreground"
      case RESOURCE_BASED_ROLES.ADMIN: return "bg-accent text-accent-foreground"
      case RESOURCE_BASED_ROLES.AGENT: return "bg-secondary text-secondary-foreground"
      default: return "bg-muted text-muted-foreground"
    }
  }

  const getRoleIcon = (role: RESOURCE_BASED_ROLES) => {
    switch (role) {
      case RESOURCE_BASED_ROLES.SUPER_ADMIN: return <Crown className="h-4 w-4" />
      case RESOURCE_BASED_ROLES.ADMIN: return <Shield className="h-4 w-4" />
      case RESOURCE_BASED_ROLES.AGENT: return <UserCog className="h-4 w-4" />
      default: return null
    }
  }

  const getRoleLabel = (role: RESOURCE_BASED_ROLES): string => {
    return role
      .replace(/_/g, ' ')
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const getAvatarFallback = (name: string): string => name.slice(0, 2).toUpperCase()

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl">Team Members</CardTitle>
          <CardDescription>Loading members...</CardDescription>
        </CardHeader>
        <CardContent className="pb-6">
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-5 p-5 rounded-xl border border-border animate-pulse">
                <div className="h-14 w-14 rounded-full bg-muted shrink-0" />
                <div className="flex-1 space-y-3">
                  <div className="h-5 w-40 bg-muted rounded" />
                  <div className="h-4 w-56 bg-muted rounded" />
                </div>
                <div className="h-8 w-24 bg-muted rounded-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isError || !members) {
    return (
      <Card className="w-full border-error/20">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl text-error">Error Loading Members</CardTitle>
          <CardDescription>Failed to load team members. Please try again.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="container">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl text-foreground">Team Members</CardTitle>
            <CardDescription className="text-muted-foreground mt-1.5">
              Manage your workspace team and permissions
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-sm px-3 py-1">
            {members.length} {members.length === 1 ? 'Member' : 'Members'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="space-y-3">
          {members.map((member: Member) => {
            const memberId = getUserId(member)
            const isCurrentUser = memberId === currentUserId
            const showActions = canManageMember(member)

            return (
              <div
                key={member.membershipId}
                className="flex items-center gap-5 p-5 rounded-xl shadow-sm bg-surface hover:bg-surface-variant transition-all duration-200"
              >
                <Avatar className="h-14 w-14 shrink-0 ring-2 ring-border">
                  <AvatarImage src={member.user.profilePicture} alt={member.user.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-lg">
                    {getAvatarFallback(member.user.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-foreground truncate text-lg">
                      {member.user.name}
                    </p>
                    {isCurrentUser && (
                      <Badge variant="outline" className="text-xs px-2">You</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4 shrink-0" />
                    <p className="text-sm truncate">{member.user.email}</p>
                  </div>
                </div>

                <Badge className={`${getRoleBadgeColor(member.role)} flex items-center gap-2 px-4 py-2 text-sm font-medium shrink-0`}>
                  {getRoleIcon(member.role)}
                  <span>{getRoleLabel(member.role)}</span>
                </Badge>

                {showActions && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-10 w-10 shrink-0">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">

                      {canPromote(member) && (
                        <DropdownMenuItem
                          onClick={() => handlePromote(member)}
                          className="cursor-pointer py-3 group hover:bg-primary focus:bg-primary"
                        >
                          <Shield className="h-4 w-4 mr-3 text-primary group-hover:text-white group-focus:text-white" />
                          <span className="font-medium group-hover:text-white group-focus:text-white">
                            Promote to Admin
                          </span>
                        </DropdownMenuItem>
                      )}

                      {canDemote(member) && (
                        <DropdownMenuItem
                          onClick={() => handleDemote(member)}
                          className="cursor-pointer py-3 group hover:bg-secondary focus:bg-secondary"
                        >
                          <UserCog className="h-4 w-4 mr-3 text-secondary group-hover:text-white group-focus:text-white" />
                          <span className="font-medium group-hover:text-white group-focus:text-white">
                            Demote to Agent
                          </span>
                        </DropdownMenuItem>
                      )}

                      {(canPromote(member) || canDemote(member)) && canRemove(member) && (
                        <DropdownMenuSeparator />
                      )}

                      {canRemove(member) && (
                        <DropdownMenuItem
                          onClick={() => handleRemove(member)}
                          className="cursor-pointer py-3 group hover:bg-error focus:bg-error"
                        >
                          <UserMinus className="h-4 w-4 mr-3 text-error group-hover:text-white group-focus:text-white" />
                          <span className="font-medium text-error group-hover:text-white group-focus:text-white">
                            Remove Member
                          </span>
                        </DropdownMenuItem>
                      )}

                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default MembersList
