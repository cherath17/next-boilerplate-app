"use client";

// React
import React from "react";
import { useRouter } from "next/router";

// TanStack Table
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

// Shadcn/UI Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import { Input } from "@/ui/input";
import { Button } from "@/ui/button";

// Local Components / Utilities
import { ColumnFilter } from "./columnFilter";
import { TableSkeletonLoader } from "../Loader";
import { EmptyTableRow } from "./emptyTableRow";

export function GenericTable<T extends object>({
  data,
  columns,
  rowLink,
  onSortChange,
  filters, // optional: { columnId: string, options: string[] }[]
}: {
  data: T[];
  columns: ColumnDef<T>[];
  rowLink?: (row: T) => string;
  onSortChange?: (sort: {
    orderBy: string;
    order: "asc" | "desc" | "";
  }) => void;
  filters?: { columnId: string; options: string[] }[];
}) {
  const router = useRouter();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === "function" ? updater(sorting) : updater;
      setSorting(newSorting);

      if (onSortChange) {
        if (newSorting.length === 0) {
          onSortChange({ orderBy: "", order: "" });
        } else {
          const col = newSorting[0];
          onSortChange({
            orderBy: col.id,
            order: col.desc ? "desc" : "asc",
          });
        }
      }
    },
    onColumnFiltersChange: (updater) => {
      setLoading(true);
      const newFilters =
        typeof updater === "function" ? updater(columnFilters) : updater;
      setColumnFilters(newFilters);
      setTimeout(() => setLoading(false), 300); // simulate async filter
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  });

  return (
    <div className="flex flex-col py-1">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {filters?.map((filter) => {
          const col = table.getColumn(filter.columnId);
          if (!col) return null;
          return (
            <ColumnFilter
              key={filter.columnId}
              column={col}
              options={filter.options.filter((o) => o !== "All")}
              placeholder={`Filter ${filter.columnId}`}
              classNames="w-20"
            />
          );
        })}

        {/* Example global search */}
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("email")?.setFilterValue(e.target.value)
          }
          className="max-w-sm"
        />
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((group) => (
            <TableRow key={group.id}>
              {group.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        {/* Loader */}
        {loading ? (
          <TableSkeletonLoader
            columnCount={table?.getAllLeafColumns().length}
            rowCount={10}
          />
        ) : (
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => rowLink && router.push(rowLink(row.original))}
                  className="cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="w-auto">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <EmptyTableRow
                  colSpan={columns.length}
                  message="No data available."
                />
              </TableRow>
            )}
          </TableBody>
        )}
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
