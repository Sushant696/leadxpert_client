import { apiWrapper } from "@/lib/api/api-wrapper";
import { apiURLs } from "@/utils/apiUrls";

const contactApi = {
  getAllContacts: async (workspaceId: string) => {
    const response = await apiWrapper.get(apiURLs.CONTACT.getAll(workspaceId));
    return response;
  },

  getContactById: async (workspaceId: string, contactId: string) => {
    const response = await apiWrapper.get(
      apiURLs.CONTACT.getById(workspaceId, contactId),
    );
    return response;
  },

  createContact: async (
    workspaceId: string,
    data: {
      name: string;
      email?: string | null;
      phone?: string | null;
      companyName?: string | null;
      designation?: string | null;
      address?: { city?: string | null; district?: string | null } | null;
      source?: string | null;
      tags?: string[];
    },
  ) => {
    const response = await apiWrapper.post(
      apiURLs.CONTACT.create(workspaceId),
      data,
    );
    return response;
  },

  updateContact: async (
    workspaceId: string,
    contactId: string,
    data: Partial<{
      name: string;
      email?: string | null;
      phone?: string | null;
      companyName?: string | null;
      designation?: string | null;
      address?: { city?: string | null; district?: string | null } | null;
      source?: string | null;
      tags?: string[];
    }>,
  ) => {
    const response = await apiWrapper.patch(
      apiURLs.CONTACT.update(workspaceId, contactId),
      data,
    );
    return response;
  },

  deleteContact: async (workspaceId: string, contactId: string) => {
    const response = await apiWrapper.delete(
      apiURLs.CONTACT.delete(workspaceId, contactId),
    );
    return response;
  },
};

export { contactApi };
