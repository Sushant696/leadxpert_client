import { useQuery } from "@tanstack/react-query"

import { getAllUserAction } from "../user-action";
import { getAllUsersParams } from "../user-types";

const useGetAllUsers = (params: getAllUsersParams) => {
  return useQuery({
    // as the params change, the query will refetch
    queryKey: ['users', params],
    queryFn: async () => getAllUserAction(params),
  })
}

export default useGetAllUsers 
