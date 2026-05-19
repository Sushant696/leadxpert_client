import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { UserRole } from '@/types/user'

interface User {
  id: string
  username: string
  email: string
  role: UserRole
}

interface AuthState {
  user: User | null
  setUser: (user: User | null) => void
  clearUser: () => void
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    { name: 'auth-storage' }
  )
)

export default useAuthStore
