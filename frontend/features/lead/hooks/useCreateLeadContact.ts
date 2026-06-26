import { useMutation, useQueryClient } from "@tanstack/react-query";

import { contactApi } from "@/features/workspace/api/contact-api";
import { Contact } from "@/features/workspace/types/contact-types";

interface CreateLeadContactPayload {
  name: string;
  email?: string | null;
  phone?: string | null;
}

const useCreateLeadContact = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-contact", workspaceId],
    mutationFn: async (contactData: CreateLeadContactPayload) => {
      const response = await contactApi.createContact(workspaceId, contactData);
      return response?.data?.contact as Contact;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts", workspaceId] });
    },
  });
};

export default useCreateLeadContact;
