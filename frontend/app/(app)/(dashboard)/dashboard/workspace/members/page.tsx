'use client';

import { RESOURCE_BASED_ROLES } from '@/types/user';
import useWorkspaceStore from '@/store/workspace-store';
import MembersList from '@/features/workspace/components/MembersList';

export default function MembersPage() {
  const { workspace } = useWorkspaceStore();

  const canManageMembers =
    workspace?.role === RESOURCE_BASED_ROLES.ADMIN ||
    workspace?.role === RESOURCE_BASED_ROLES.SUPER_ADMIN;

  return (
    <div className="w-full p-8">
      <MembersList />
      {canManageMembers && (
        <button className="btn-primary">
          Invite New Member
        </button>
      )}
    </div>
  );
}
