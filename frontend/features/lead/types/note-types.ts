export interface Note {
  _id: string;
  workspaceId: string;
  createdBy: {
    _id: string;
    name: string;
  };
  entityType: "LEAD" | "DEAL";
  entityId: string;
  content: string;
  isPinned: boolean;
  isEdited: boolean;
  editedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNotePayload {
  content: string;
  entityType: "LEAD" | "DEAL";
  entityId: string;
  isPinned?: boolean;
}

export interface UpdateNotePayload {
  content?: string;
  isPinned?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type CreateNoteResponse = ApiResponse<{ note: Note }>;
export type GetNotesResponse = ApiResponse<{ notes: Note[] }>;
export type UpdateNoteResponse = ApiResponse<{ note: Note }>;
export type DeleteNoteResponse = ApiResponse<Record<string, never>>;
