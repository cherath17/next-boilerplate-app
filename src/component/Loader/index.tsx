import { TableBody, TableCell, TableRow } from "@/ui/table";
import { Skeleton } from "@/ui/skeleton";

export interface TableSkeletonLoaderProps {
  columnCount: number;
  rowCount?: number;
}

export function TableSkeletonLoader({
  columnCount,
  rowCount = 10,
}: TableSkeletonLoaderProps) {
  return (
    <TableBody>
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columnCount }).map((_, colIndex) => (
            <TableCell key={colIndex}>
              <Skeleton
                className={
                  colIndex === columnCount - 1
                    ? "h-4 w-[40%] bg-primary-mid"
                    : "h-4 w-[80%] bg-primary-mid"
                }
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
