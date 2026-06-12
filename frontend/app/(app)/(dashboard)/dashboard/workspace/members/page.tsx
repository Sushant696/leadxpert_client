'use client';

import { RESOURCE_BASED_ROLES } from '@/types/user';
import useWorkspaceStore from '@/store/workspace-store';

export default function MembersPage() {
  const { workspace } = useWorkspaceStore();

  const canManageMembers =
    workspace?.role === RESOURCE_BASED_ROLES.ADMIN ||
    workspace?.role === RESOURCE_BASED_ROLES.SUPER_ADMIN;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Team Members</h1>
      {canManageMembers && (
        <button className="btn-primary">
          Invite New Member
        </button>
      )}
    </div>
  );
}
