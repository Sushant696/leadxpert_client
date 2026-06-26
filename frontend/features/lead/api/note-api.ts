import { apiURLs } from "@/utils/apiUrls";
import { apiWrapper } from "@/lib/api/api-wrapper";
import {
  CreateNotePayload,
  UpdateNotePayload,
  CreateNoteResponse,
  GetNotesResponse,
  UpdateNoteResponse,
  DeleteNoteResponse,
} from "../types/note-types";

const noteApi = {
  createNote: async (
    workspaceId: string,
    data: CreateNotePayload,
  ): Promise<CreateNoteResponse> => {
    return await apiWrapper.post(
      apiURLs.NOTE.create(workspaceId),
      data,
    );
  },

  getNotesByEntity: async (
    workspaceId: string,
    entityType: string,
    entityId: string,
  ): Promise<GetNotesResponse> => {
    return await apiWrapper.get(
      apiURLs.NOTE.getByEntity(workspaceId, entityType, entityId),
    );
  },

  updateNote: async (
    workspaceId: string,
    noteId: string,
    data: UpdateNotePayload,
  ): Promise<UpdateNoteResponse> => {
    return await apiWrapper.patch(
      apiURLs.NOTE.update(workspaceId, noteId),
      data,
    );
  },

  deleteNote: async (
    workspaceId: string,
    noteId: string,
  ): Promise<DeleteNoteResponse> => {
    return await apiWrapper.delete(
      apiURLs.NOTE.delete(workspaceId, noteId),
    );
  },
};

export { noteApi };
