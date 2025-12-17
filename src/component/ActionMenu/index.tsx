// ─── Action Menu ──────────────────────────────────
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/ui/dropdown-menu";
import { Button } from "@/ui/button";
import { MoreHorizontal } from "lucide-react";
import { ActionMenuProps } from "@/interface/actionItem.interface";

export function ActionMenu<T>({
  row,
  actions,
  label = "Actions",
}: ActionMenuProps<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>

        {actions.map((action, index) => (
          <div key={index}>
            {action.separator && <DropdownMenuSeparator />}

            <DropdownMenuItem
              disabled={action.disabled}
              onClick={() => action.onClick(row)}
            >
              {action.label}
            </DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
