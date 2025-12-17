"use client";

// Interfaces
import { StatusBadgeProps } from "@/interface/status.interface";

// Constants
import { STATUS_STYLES } from "@/constants/status.constant";

// Utilities
import { cn } from "@/utils/utils";

export function StatusBadge({
  status,
  className,
  showDot = true,
}: StatusBadgeProps) {
  const style =
    STATUS_STYLES[status as keyof typeof STATUS_STYLES] ??
    STATUS_STYLES["InActive"];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium",
        style.bg,
        style.text,
        className
      )}
    >
      {showDot && <span className={cn("h-2 w-2 rounded-full", style.dot)} />}
      {style.label}
    </div>
  );
}
