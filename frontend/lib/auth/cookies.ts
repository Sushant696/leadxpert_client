"use server"

import { cookies } from 'next/headers';

import cookieConfig from '@/utils/cookieConfig';

export const setAccessToken = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set({ name: 'accessToken', value: token, ...cookieConfig.accessTokenConfig })
}

export const setRefreshToken = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set({ name: 'refreshToken', value: token, ...cookieConfig.refreshTokenConfig })
}

export const getAccessToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get('accessToken')?.value;
}

export const getRefreshToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get('refreshToken')?.value;
}

export const clearAuthCookies = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
}
