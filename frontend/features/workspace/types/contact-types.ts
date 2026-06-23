export interface Contact {
  _id: string;
  workspaceId: string;
  createdBy: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  companyName?: string | null;
  designation?: string | null;
  address?: {
    district?: string | null;
    city?: string | null;
  } | null;
  source?: string | null;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
}
