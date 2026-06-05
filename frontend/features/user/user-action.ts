"use server";

import { userApi } from "./user-api";
import { UpdateUser } from "../auth/auth.types";
import SessionExpiredError from "@/lib/auth/session-error-handler";
import { getAllUsersParams } from "./user-types";

export async function updateProfileAction(data: UpdateUser) {
  try {
    const response = await userApi.updateUser(data);

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


export async function getAllUserAction(params: getAllUsersParams) {
  try {
    const response = await userApi.getAllUsers(params);

    if (response.success) {
      return {
        success: true,
        message: response.message || 'Users retrived successfully',
        data: response?.data,
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


export async function deleteUserAction(userId: string) {
  try {
    const response = await userApi.deleteUser(userId);

    if (response.success) {
      return {
        success: true,
        message: response.message || 'User Deleted successfully',
      };
    }

    return {
      success: false,
      message: response.message || 'Failed to delete user'
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
      error: error.message || 'Failed to delete user'
    };
  }
}

