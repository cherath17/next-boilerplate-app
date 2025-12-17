import { Column, ColumnDef } from "@tanstack/react-table";

export type Payment = {
  id: string;
  amount: number;
  status: string;
  email: string;
  customer?: string;
};

export type Info = {
  status: string;
  role: string;
  yearsOfExperience: number;
  department: string;
  location: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  status?: string;
  info: Info;
};

// Global Column Types
export type ColumnOverride<T> = {
  [K in keyof T]?: {
    header?: string;
    cell?: (row: T) => React.ReactNode;
  };
};

export interface EmptyTableRowProps {
  colSpan: number;
  message?: string;
}

export type ColumnFilterProps<T> = {
  column: Column<T, unknown>;
  options: string[];
  placeholder?: string;
  classNames?: string;
};

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export type SortableHeaderProps<TData> = {
  column: Column<TData, unknown>;
  title: string;
  showTitle?: boolean;
  disableSort?: boolean;
};

export type SortOrder = "asc" | "desc" | "";
