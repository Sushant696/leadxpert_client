"use server"

import { cookies } from 'next/headers';

import { UserRole } from '@/types/user';
import cookieConfig from '@/utils/cookieConfig';

export const setAccessToken = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set({ name: 'accessToken', value: token, ...cookieConfig.accessTokenConfig })
}

export const setRefreshToken = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set({ name: 'refreshToken', value: token, ...cookieConfig.refreshTokenConfig })
}

export const setUserRole = async (role: UserRole) => {
  const cookieStore = await cookies();
  cookieStore.set({ name: 'userRole', value: role, ...cookieConfig.roleConfig })
}

export const getAccessToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get('accessToken')?.value;
}

export const getRefreshToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get('refreshToken')?.value;
}

export const getUserRole = async (): Promise<UserRole | undefined> => {
  const cookieStore = await cookies();
  return cookieStore.get('userRole')?.value as UserRole | undefined;
}

// batch operation for atomic cookie setting 
export const setAuthCookies = async (
  accessToken: string,
  refreshToken: string,
  role?: UserRole
) => {
  const cookieStore = await cookies();

  cookieStore.set('accessToken', accessToken, cookieConfig.accessTokenConfig);
  cookieStore.set('refreshToken', refreshToken, cookieConfig.refreshTokenConfig);

  if (role) {
    cookieStore.set('userRole', role, cookieConfig.roleConfig);
  }
}

export const clearAuthCookies = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
  cookieStore.delete('userRole');
}
