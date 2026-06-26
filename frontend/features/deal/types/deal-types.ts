// ─── Deal Status
export const DealStatus = {
  ACTIVE: "ACTIVE",
  COMPLETED: "COMPLETED",
  ON_HOLD: "ON_HOLD",
  REFUNDED: "REFUNDED",
  CANCELLED: "CANCELLED",
} as const;
export type DealStatus = typeof DealStatus[keyof typeof DealStatus];

// ─── Payment Type
export const PaymentType = {
  ONE_TIME: "ONE_TIME",
  INSTALLMENT: "INSTALLMENT",
  RETAINER: "RETAINER",
  MILESTONE: "MILESTONE",
} as const;
export type PaymentType = typeof PaymentType[keyof typeof PaymentType];

// ─── Currency
export const Currency = {
  NPR: "NPR",
  USD: "USD",
  INR: "INR",
  GBP: "GBP",
  AUD: "AUD",
  CAD: "CAD",
} as const;
export type Currency = typeof Currency[keyof typeof Currency];

export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
}

export interface Deal {
  _id: string;
  title: string;
  value: number;
  currency: Currency;
  status: DealStatus;
  paymentType: PaymentType;
  advancePaid: number;
  amountReceived: number;
  amountPending: number;
  serviceDescription?: string | null;
  deliverables: string[];
  startDate?: Date | null;
  expectedEndDate?: Date | null;
  actualEndDate?: Date | null;
  workspaceId: string;
  leadId: string;
  contactId: string;
  pipelineId: string;
  createdBy: User;
  assignedTo?: User | null;
  taskCount: number;
  noteCount: number;
  activityCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDealPayload {
  leadId: string;
  title?: string;
  value?: number;
  currency?: Currency;
  paymentType?: PaymentType;
  advancePaid?: number;
  amountReceived?: number;
  serviceDescription?: string | null;
  deliverables?: string[];
  startDate?: Date | null;
  expectedEndDate?: Date | null;
  assignedTo?: string | null;
}

export interface UpdateDealPayload {
  title?: string;
  value?: number;
  currency?: Currency;
  status?: DealStatus;
  paymentType?: PaymentType;
  advancePaid?: number;
  amountReceived?: number;
  serviceDescription?: string | null;
  deliverables?: string[];
  startDate?: Date | null;
  expectedEndDate?: Date | null;
  actualEndDate?: Date | null;
  assignedTo?: string | null;
}

export interface CreateDealResponse {
  success: boolean;
  message: string;
  data: {
    deal: Deal;
  };
}

export interface GetDealsResponse {
  success: boolean;
  message: string;
  data: {
    deals: Deal[];
  };
}

export interface GetDealResponse {
  success: boolean;
  message: string;
  data: {
    deal: Deal;
  };
}

export interface UpdateDealResponse {
  success: boolean;
  message: string;
  data: {
    deal: Deal;
  };
}

export interface DeleteDealResponse {
  success: boolean;
  message: string;
}

export interface GetDealsFilters {
  assignedTo?: string;
  search?: string;
  status?: DealStatus;
}
