import { apiURLs } from "@/utils/apiUrls";
import { UpdateUser } from "../auth/auth.types";
import { getAllUsersParams } from "./user-types";
import { apiWrapper } from "@/lib/api/api-wrapper";

export const userApi = {
  getAllUsers: async (params: getAllUsersParams) => {
    return await apiWrapper.get(apiURLs.USER.getAllUsers, params);
  },

  updateUser: async (data: UpdateUser) => {
    return await apiWrapper.patch(apiURLs.USER.updateUser, data);
  },
}
