import { RESOURCE_BASED_ROLES } from '@/types/user';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Workspace {
  id: string;
  name: string;
  role: RESOURCE_BASED_ROLES;
  slug?: string;
}

interface WorkspaceStore {
  workspace: Workspace | null;
  setWorkspace: (workspace: Workspace) => void;
  clearWorkspace: () => void;
  isActiveWorkspace: (slug: string) => boolean;
}

const useWorkspaceStore = create<WorkspaceStore>()(
  persist(
    (set, get) => ({
      workspace: null,
      setWorkspace: (workspace) => set({ workspace }),
      clearWorkspace: () => set({ workspace: null }),
      isActiveWorkspace: (slug: string) => {
        const currentWorkspace = get().workspace;
        return currentWorkspace?.slug === slug;
      }
    }),
    {
      name: 'active-workspace',
    }
  )
);

export default useWorkspaceStore;
