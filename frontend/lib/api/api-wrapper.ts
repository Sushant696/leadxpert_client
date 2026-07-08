import axiosInstance from "./axios";
import { apiURLs } from "@/utils/apiUrls";
import SessionExpiredError from "../auth/session-error-handler";
import {
  clearAuthCookies,
  getAccessToken,
  getRefreshToken,
  setAuthCookies,
} from "../auth/cookies";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestConfig {
  url: string;
  method: HttpMethod;
  data?: any;
  params?: any;
  headers?: Record<string, string>;
}

// Single send with a given bearer token. Kept separate so the original request
// and the post-refresh retry share identical config.
function sendRequest(config: RequestConfig, accessToken: string) {
  return axiosInstance.request({
    url: config.url,
    method: config.method,
    data: config.data,
    params: config.params,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

async function makeAuthenticatedRequest<T>(config: RequestConfig): Promise<T> {
  let accessToken = await getAccessToken();

  if (!accessToken) {
    try {
      accessToken = await refreshAccessToken();
    } catch (refreshError: any) {
      throw new SessionExpiredError("No access token available");
    }
  }

  try {
    const response = await sendRequest(config, accessToken);

    // axios validateStatus accepts all 2xx-5xx codes, so a 401 won't throw —
    // check the status explicitly and refresh + retry once.
    if (response.status === 401) {
      const newAccessToken = await refreshAccessToken();
      const retryResponse = await sendRequest(config, newAccessToken);

      if (retryResponse.status === 401) {
        throw new SessionExpiredError(
          "Your session has expired. Please login again.",
        );
      }

      return retryResponse.data;
    }

    return response.data;
  } catch (error: any) {
    if (error instanceof SessionExpiredError) throw error;

    // Defensive: if axios ever throws on a 401 (e.g. validateStatus changes),
    // attempt a single refresh + retry here too.
    if (error.response?.status === 401) {
      try {
        const newAccessToken = await refreshAccessToken();
        const retryResponse = await sendRequest(config, newAccessToken);
        return retryResponse.data;
      } catch (refreshError: any) {
        // Refresh failed - session is completely expired
        throw new SessionExpiredError(
          "Your session has expired. Please login again.",
        );
      }
    }
    // If it's not a 401, just throw the original error
    throw error;
  }
}

/*
 * Refreshes access token using the refresh token.
 * Gets called automatically when a 401 is detected if apiWrapper methods are used.
 *
 * Single-flight: when the kanban board fires many requests at once and they all
 * 401 together, we want EXACTLY ONE refresh request — not one per failed call.
 * Concurrent callers share the same in-flight promise; the slot clears once it
 * settles so the next expiry can refresh again.
 */
let refreshPromise: Promise<string> | null = null;

export function refreshAccessToken(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = doRefreshAccessToken().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

async function doRefreshAccessToken(): Promise<string> {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  try {
    const response = await axiosInstance.post(
      apiURLs.AUTH.refresh,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    );

    if (!response.data.success) {
      throw new Error("Refresh token invalid or expired");
    }

    const {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      user,
    } = response.data.data;
    await setAuthCookies(newAccessToken, newRefreshToken, user?.role);
    return newAccessToken;
  } catch (error: Error | any) {
    console.error("❌ Refresh failed:", error.message);
    await clearAuthCookies();
    throw new SessionExpiredError("Session refresh failed");
  }
}

// Generic API wrapper methods

export const apiWrapper = {
  get: <T = any>(url: string, params?: any, headers?: Record<string, string>) =>
    makeAuthenticatedRequest<T>({ url, method: "GET", params, headers }),

  post: <T = any>(url: string, data?: any, headers?: Record<string, string>) =>
    makeAuthenticatedRequest<T>({ url, method: "POST", data, headers }),

  put: <T = any>(url: string, data?: any, headers?: Record<string, string>) =>
    makeAuthenticatedRequest<T>({ url, method: "PUT", data, headers }),

  patch: <T = any>(url: string, data?: any, headers?: Record<string, string>) =>
    makeAuthenticatedRequest<T>({ url, method: "PATCH", data, headers }),

  delete: <T = any>(
    url: string,
    data?: any,
    headers?: Record<string, string>,
  ) => makeAuthenticatedRequest<T>({ url, method: "DELETE", data, headers }),
};
