import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  isEmailVerified: boolean
  isActive: boolean
  onboardingCompleted: boolean
  profilePicture?: string
  email: string
  createdAt: Date
  updatedAt: Date
  lastLoginAt?: Date
}

interface InviteCode {
  token: string
}

interface AuthState {
  user: User | null
  token: InviteCode | null
  setUser: (user: User | null) => void
  clearUser: () => void
  setInviteToken: (token: InviteCode) => void
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      setInviteToken: (token) => set({ token }),
    }),
    { name: 'auth-storage' }
  )
)

export default useAuthStore
