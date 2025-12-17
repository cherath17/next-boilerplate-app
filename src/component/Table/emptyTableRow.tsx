// Interfaces
import { EmptyTableRowProps } from "@/interface/table.interface";

// UI Components
import { TableRow, TableCell } from "@/ui/table";

export function EmptyTableRow({
  colSpan,
  message = "No results.",
}: EmptyTableRowProps) {
  return (
    <TableCell colSpan={colSpan} className="p-4">
      <div className="w-full flex justify-center items-center">
        <span className="text-muted-foreground">{message}</span>
      </div>
    </TableCell>
  );
}
