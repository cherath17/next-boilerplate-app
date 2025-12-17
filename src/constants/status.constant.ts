import { Status } from "@/interface/status.interface";

export const STATUS_MAP: Record<string, keyof typeof STATUS_STYLES> = {
  Active: "Active",
  InActive: "InActive",
  Inactive: "InActive",
  Paid: "Paid",
  Success: "Paid",
  Pending: "Pending",
  Failed: "Failed",
  Upcoming: "Upcoming",
};

export const STATUS_STYLES: Record<
  Status,
  {
    bg: string;
    text: string;
    dot: string;
    label: string;
  }
> = {
  Active: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    dot: "bg-emerald-600",
    label: "Active",
  },
  InActive: {
    bg: "bg-gray-100",
    text: "text-gray-600",
    dot: "bg-gray-500",
    label: "Inactive",
  },
  Paid: {
    bg: "bg-green-100",
    text: "text-green-700",
    dot: "bg-green-600",
    label: "Paid",
  },
  Pending: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    dot: "bg-yellow-600",
    label: "Pending",
  },
  Failed: {
    bg: "bg-red-100",
    text: "text-red-700",
    dot: "bg-red-600",
    label: "Failed",
  },
  Upcoming: {
    bg: "bg-blue-100",
    text: "text-blue-700",
    dot: "bg-blue-600",
    label: "Upcoming",
  },
};
