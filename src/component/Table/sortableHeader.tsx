// Interfaces
import { SortableHeaderProps } from "@/interface/table.interface";

// UI Components
import { Button } from "@/ui/button";

// Local Components / Utilities
import { SortTitle } from "./sortTitle";
import { SortIcon } from "./iconSort";

export function SortableHeader<TData>({
  column,
  title,
  showTitle = true,
}: SortableHeaderProps<TData>) {
  if (!column.getCanSort()) {
    return <div className="font-medium">{title}</div>;
  }

  const order = column.getIsSorted();

  return (
    <Button
      variant="ghost"
      className="flex items-center gap-1.5 p-0 w-auto h-auto font-medium bg-transparent"
      onClick={() => column.toggleSorting(order === "asc")}
    >
      <SortTitle title={title} show={showTitle} />

      <SortIcon order={order === false ? "" : order} />
    </Button>
  );
}
