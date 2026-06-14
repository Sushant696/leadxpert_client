'use client';

import { Button } from '@/components/ui/button';
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
      <div className="flex justify-end">
        {canManageMembers && (
          <Button className="flex items-center mb-4 bg-muted" variant="outline">
            Invite New Member
          </Button>
        )}
      </div>
      <MembersList />
    </div>
  );
}
