// Interfaces
import { SortOrder } from "@/interface/table.interface";

// Icons
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";

export function SortIcon({
  order,
  classNames,
}: {
  order: SortOrder;
  classNames?: string;
}) {
  switch (order) {
    case "asc":
      return <ArrowUp className={`${classNames} h-4 w-4`} />;
    case "desc":
      return <ArrowDown className={`${classNames} h-4 w-4`} />;
    default:
      return <ArrowUpDown className={`${classNames} h-4 w-4 opacity-50`} />;
  }
}
