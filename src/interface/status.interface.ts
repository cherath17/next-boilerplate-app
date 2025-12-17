export type Status =
  | "Active"
  | "InActive"
  | "Paid"
  | "Pending"
  | "Failed"
  | "Upcoming";

export interface StatusBadgeProps {
  status: Status;
  className?: string;
  showDot?: boolean;
}
