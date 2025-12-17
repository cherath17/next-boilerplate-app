"use client";

// Interfaces
import { Payment, User } from "@/interface/table.interface";
import { Status } from "@/interface/status.interface";

// Constants
import { STATUS_MAP } from "@/constants/status.constant";

// UI Components
import { Checkbox } from "@/ui/checkbox";
import { StatusBadge } from "../StatusBadge";
import { ActionMenu } from "../ActionMenu";

// Table Utilities
import { ColumnDef } from "@tanstack/react-table";
import { SortableHeader } from "./sortableHeader";
import { renderAvatarCell } from "./renderAvatarCell";

export const transactionColumns: ColumnDef<Payment>[] = [
  {
    id: "select",
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => <SortableHeader column={column} title="Email" />,
    cell: ({ row }) => renderAvatarCell(row, row.original.email),
    enableSorting: true,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <SortableHeader column={column} title="Amount" />,
    cell: ({ row }) => {
      const amount = Number(row.getValue("amount"));
      return (
        <div className="font-medium">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount)}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },

  {
    accessorKey: "status",
    header: ({ column }) => <SortableHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const rawStatus = row.getValue("status") as string;

      const mappedStatus = STATUS_MAP[rawStatus] ?? "InActive";

      return <StatusBadge status={mappedStatus} />;
    },
    enableSorting: true,
    enableHiding: true,
  },

  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    header: () => <div>Action</div>,
    cell: ({ row }) => (
      <ActionMenu
        row={row.original}
        actions={[
          {
            label: "Copy payment ID",
            onClick: (payment) => navigator.clipboard.writeText(payment.id),
          },
          {
            separator: true,
            label: "View customer",
            onClick: (payment) => {
              console.log("View customer", payment?.customer);
            },
          },
          {
            label: "View payment details",
            onClick: (payment) => {
              console.log("View payment", payment.id);
            },
          },
        ]}
      />
    ),
  },
];

export const userColumns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => {
      return (
        <div className="w-auto">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        </div>
      );
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortableHeader column={column} title="Name" />,
    cell: ({ row }) => renderAvatarCell(row, row.original.name),
  },
  {
    accessorKey: "email",
    header: ({ column }) => <SortableHeader column={column} title="Email" />,
  },
  {
    accessorFn: (row) => row.info.status,
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Status;

      return <StatusBadge status={status} />;
    },
  },
  {
    accessorFn: (row) => row.info.role,
    id: "role",
    header: "Role",
  },
  {
    accessorFn: (row) => row.info.yearsOfExperience,
    id: "experience",
    header: ({ column }) => (
      <SortableHeader column={column} title="Years Exp" />
    ),
    cell: ({ row }) => (
      <div className="text-center max-w-[100px]">
        {row.getValue("experience")}
      </div>
    ),
  },
  {
    accessorFn: (row) => row.info.department,
    id: "department",
    header: "Department",
  },
  {
    accessorFn: (row) => row.info.location,
    id: "location",
    header: "Location",
  },
];
