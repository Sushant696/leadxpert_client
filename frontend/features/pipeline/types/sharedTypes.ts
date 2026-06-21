import { BusinessVertical, Currency } from "./pipeline-types";

export const VERTICAL_LABELS: Record<BusinessVertical, string> = {
  [BusinessVertical.GENERAL]: "General",
  [BusinessVertical.REAL_ESTATE]: "Real Estate",
  [BusinessVertical.IT_SOFTWARE]: "IT & Software",
  [BusinessVertical.LEGAL_FINANCIAL]: "Legal & Financial",
  [BusinessVertical.RECRUITMENT]: "Recruitment",
  [BusinessVertical.EVENT_MANAGEMENT]: "Event Management",
  [BusinessVertical.EDUCATION_CONSULTANCY]: "Education Consultancy",
  [BusinessVertical.DIGITAL_MARKETING]: "Digital Marketing",
};

export const VERTICAL_ICONS: Record<BusinessVertical, string> = {
  [BusinessVertical.GENERAL]: "⚡",
  [BusinessVertical.REAL_ESTATE]: "🏢",
  [BusinessVertical.IT_SOFTWARE]: "💻",
  [BusinessVertical.LEGAL_FINANCIAL]: "⚖️",
  [BusinessVertical.RECRUITMENT]: "👥",
  [BusinessVertical.EVENT_MANAGEMENT]: "🎪",
  [BusinessVertical.EDUCATION_CONSULTANCY]: "🎓",
  [BusinessVertical.DIGITAL_MARKETING]: "📱",
};

export const PRESET_COLORS = [
  { hex: "#1E40AF", label: "Ocean" },
  { hex: "#3B82F6", label: "Sky" },
  { hex: "#F97316", label: "Ember" },
  { hex: "#EF4444", label: "Crimson" },
  { hex: "#10B981", label: "Jade" },
  { hex: "#8B5CF6", label: "Violet" },
  { hex: "#EC4899", label: "Rose" },
  { hex: "#F59E0B", label: "Gold" },
];

export const AVAILABLE_CURRENCIES = [
  { code: Currency.NPR, label: "NPR", symbol: "₨" },
  { code: Currency.USD, label: "USD", symbol: "$" },
  { code: Currency.EUR, label: "EUR", symbol: "€" },
  { code: Currency.GBP, label: "GBP", symbol: "£" },
  { code: Currency.INR, label: "INR", symbol: "₹" },
];


