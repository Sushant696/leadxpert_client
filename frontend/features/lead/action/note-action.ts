"use server";

import { noteApi } from "../api/note-api";
import { CreateNotePayload, UpdateNotePayload } from "../types/note-types";

export async function createNoteAction(
  workspaceId: string,
  data: CreateNotePayload,
) {
  const response = await noteApi.createNote(workspaceId, data);
  if (!response.success) {
    throw new Error(response.message || "Failed to create note");
  }
  return response.data.note;
}

export async function getNotesByEntityAction(
  workspaceId: string,
  entityType: string,
  entityId: string,
) {
  const response = await noteApi.getNotesByEntity(
    workspaceId,
    entityType,
    entityId,
  );
  if (!response.success) {
    throw new Error(response.message || "Failed to fetch notes");
  }
  return response.data.notes;
}

export async function updateNoteAction(
  workspaceId: string,
  noteId: string,
  data: UpdateNotePayload,
) {
  const response = await noteApi.updateNote(workspaceId, noteId, data);
  if (!response.success) {
    throw new Error(response.message || "Failed to update note");
  }
  return response.data.note;
}

export async function deleteNoteAction(
  workspaceId: string,
  noteId: string,
) {
  const response = await noteApi.deleteNote(workspaceId, noteId);
  if (!response.success) {
    throw new Error(response.message || "Failed to delete note");
  }
}
