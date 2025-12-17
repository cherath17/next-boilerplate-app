// Interface
import { MenuItem } from "@/interface/sideBar.interface";

// Icons
import { LayoutDashboard, Users, LogOut } from "lucide-react";

export const sideMenu: MenuItem[] = [
  {
    label: "dashboard",
    icon: LayoutDashboard,
    isGroupHead: false,
    children: [
      {
        label: "Dashboard",
        to: "/dashboard",
        active: ["/dashboard"],
        icon: LayoutDashboard,
      },
    ],
  },

  {
    label: "users",
    icon: Users,
    isGroupHead: true,
    children: [
      {
        label: "Users",
        to: "/users",
        active: ["/users"],
        icon: Users,
      },
    ],
  },
];

export const logoutMenu = [
  {
    label: "Logout",
    icon: LogOut,
    isGroupHead: false,
    children: [
      {
        label: "Logout",
        to: "/login",
        active: ["/login"],
        icon: LogOut,
      },
    ],
    onClick: () => {
      // logout();
    },
  },
];
