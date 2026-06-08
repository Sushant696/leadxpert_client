import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WorkspaceStore {
  activeWorkspaceSlug: string | null;
  setActiveWorkspace: (slug: string) => void;
}

const useWorkspaceStore = create<WorkspaceStore>()(
  persist(
    (set) => ({
      activeWorkspaceSlug: null,
      setActiveWorkspace: (slug: string) => set({ activeWorkspaceSlug: slug }),
    }),
    {
      name: 'active-workspace',
    }
  )
);

export default useWorkspaceStore;
