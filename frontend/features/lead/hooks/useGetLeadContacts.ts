import { useQuery } from "@tanstack/react-query";

import { contactApi } from "@/features/workspace/api/contact-api";
import { Contact } from "@/features/workspace/types/contact-types";

const useGetLeadContacts = (workspaceId: string) => {
  return useQuery({
    queryKey: ["contacts", workspaceId],
    queryFn: async (): Promise<Contact[]> => {
      const response = await contactApi.getAllContacts(workspaceId);

      if (Array.isArray(response?.data)) {
        return response.data as Contact[];
      }

      return (response?.data?.contacts ?? []) as Contact[];
    },
    enabled: !!workspaceId,
  });
};

export default useGetLeadContacts;
