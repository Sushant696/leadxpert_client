"use server";

import { cookies } from "next/headers";

import { authApi } from "./auth-api";
import cookieConfig from "@/utils/cookieConfig";
import { LoginCredentials, RegisterData, UpdateUser } from "./auth.types";
import SessionExpiredError from "@/lib/auth/session-error-handler";


export async function loginAction(formData: LoginCredentials) {
  try {
    // runs on next js server
    const response = await authApi.login(formData);
    const cookieStore = await cookies();
    cookieStore.set('accessToken', response?.data?.accessToken, cookieConfig.accessTokenConfig);
    cookieStore.set('refreshToken', response?.data?.refreshToken, cookieConfig.refreshTokenConfig);

    return {
      success: true,
      data: response.data.user,
    };

  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Login failed",
    };
  }
}

export async function registerAction(formData: RegisterData) {
  try {
    const response = await authApi.register(formData)
    console.log(response, "respone received from the registeraction")
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.message || "Registration failed",
    };
  }
}

export async function logoutAction() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: "Logout failed",
    };
  }
}

export async function updateProfileAction(data: UpdateUser) {
  try {
    const response = await authApi.updateUser(data);

    if (response.success) {
      return {
        success: true,
        message: response.message || 'Profile updated successfully',
        data: response.data,
      };
    }

    return {
      success: false,
      message: response.message || 'Failed to update profile'
    };

  } catch (error: any) {
    if (error instanceof SessionExpiredError) {
      return {
        success: false,
        sessionExpired: true,
        error: error.message,
      };
    }

    return {
      success: false,
      error: error.message || 'Failed to update profile'
    };
  }
}
