"use server";

import { authApi } from "./auth-api";
import { LoginCredentials, RegisterData } from "./auth.types";
import SessionExpiredError from "@/lib/auth/session-error-handler";
import {
  clearAuthCookies,
  getAccessToken,
  setAccessToken,
  setRefreshToken,
  setUserRole
} from "@/lib/auth/cookies";

export async function loginAction(formData: LoginCredentials) {
  const response = await authApi.login(formData);

  if (!response.success) {
    throw new Error(response.message || 'Login failed');
  }

  await setAccessToken(response.data?.accessToken);
  await setRefreshToken(response.data?.refreshToken);
  await setUserRole(response.data?.user?.role);

  return response.data.user;
}

export async function registerAction(formData: RegisterData) {
  const response = await authApi.register(formData);
  if (!response.success) {
    throw new Error(response.message || 'Registration failed');
  }

  return response.data;
}

export async function logoutAction() {
  await clearAuthCookies();
  return { success: true };
}

export async function getCurrentUserAction() {
  try {
    const response = await authApi.getCurrentUser();

    if (!response.success) {
      return {
        success: false,
        sessionExpired: response.sessionExpired || false,
        error: response.message || 'Failed to fetch user data'
      };
    }

    return {
      success: true,
      data: response.data
    };
  } catch (error: any) {
    if (error instanceof SessionExpiredError) {
      return {
        success: false,
        sessionExpired: true,
        error: error.message
      };
    }

    return {
      success: false,
      sessionExpired: false,
      error: error.message || 'Failed to get user'
    };
  }
}

export async function joinWorkspaceAction(token: string) {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return {
      success: false,
      status: 401,
      message: "Please login to join the workspace",
    }
  }

  const response = await authApi.joinWorkspaceByToken(token, accessToken);

  if (!response.success) {
    throw new Error(response.message || "Failed to join workspace");
  }

  return {
    success: response.success || false,
    status: response.status,
    message: response.message || "Operation completed",
  }
}

export async function clearAuthCookiesAction() {
  await clearAuthCookies();
  return { success: true };
}
