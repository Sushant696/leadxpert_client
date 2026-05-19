"use server";

import { cookies } from "next/headers";
import { authApi } from "./auth-api";
import { LoginCredentials, RegisterData } from "./auth.types";

export async function loginAction(formData: LoginCredentials) {
  try {
    // runs on next js server
    const response = await authApi.login(formData);

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

