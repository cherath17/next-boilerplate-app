"use client";

// Interfaces
import { ColumnFilterProps } from "@/interface/table.interface";

// UI Components
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/ui/select";

export function ColumnFilter<T>({
  column,
  options,
  placeholder,
  classNames,
}: ColumnFilterProps<T>) {
  const currentValue = (column.getFilterValue() as string) || "All";

  return (
    <Select
      key={column.id}
      value={currentValue}
      onValueChange={(value) => {
        // Toggle back to "All" if selected again
        if (value === "All" || value === currentValue) {
          column.setFilterValue("");
        } else {
          column.setFilterValue(value);
        }
      }}
    >
      <SelectTrigger className={`${classNames} md:w-48 w-full`}>
        <SelectValue placeholder={placeholder || `Filter ${column.id}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All">All</SelectItem>
        {options.map((opt) => (
          <SelectItem key={opt} value={opt}>
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
