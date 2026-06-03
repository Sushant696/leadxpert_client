"use server";

import { authApi } from "./auth-api";
import { LoginCredentials, RegisterData, UpdateUser } from "./auth.types";
import SessionExpiredError from "@/lib/auth/session-error-handler";
import { clearAuthCookies, setAccessToken, setRefreshToken, setUserRole } from "@/lib/auth/cookies";

export async function loginAction(formData: LoginCredentials) {
  try {
    const response = await authApi.login(formData);

    if (response.success) {
      await setAccessToken(response.data?.accessToken);
      await setRefreshToken(response.data?.refreshToken);
      await setUserRole(response.data?.user?.role);

      return {
        success: true,
        message: response.message || 'Login successful',
        data: response.data.user,
      };
    }

    return {
      success: false,
      message: response.message || 'Login failed'
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
    const response = await authApi.register(formData);

    return {
      success: true,
      message: response.message || 'Registration successful',
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
    /*
     * Implement logout api after refresh token is saved in db to remove session from db as well
        try {
          await authApi.logout();
        } catch (error) {
          await clearAuthCookies();
          console.log("Logout API call failed, but clearing cookies anyway");
        }
    */
    await clearAuthCookies();
    return { success: true };
  } catch (error: any) {
    return { success: true };
  }
}

export async function getCurrentUserAction() {
  try {
    const response = await authApi.getCurrentUser();

    if (response.success) {
      return {
        success: true,
        message: response.message,
        data: response.data,
      };
    }

    return {
      success: false,
      sessionExpired: true,
      message: response.message || 'Failed to fetch user data'
    };

  } catch (error: any) {
    // Check if it's a session expired error
    if (error instanceof SessionExpiredError) {
      return {
        success: false,
        sessionExpired: true,
        error: error.message,
      };
    }

    return {
      success: false,
      error: error.message || 'Failed to get user'
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

export async function clearAuthCookiesAction() {
  try {
    await clearAuthCookies();
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
