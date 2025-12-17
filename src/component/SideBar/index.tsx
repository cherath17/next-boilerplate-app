"use client";

// React
import type React from "react";
import Link from "next/link";

// Sidebar Components
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/ui/sidebar";

// Hooks
import { useSideBar } from "./useSideBar";
import { useAuth } from "@/context/AuthContext";

// Components
import { NavUser } from "../NavUser";

// Types / Interfaces
import type { HeaderActionsProps } from "@/interface/headerActionsProp.interface";
import type { MenuItem } from "@template/interface/sideBar.interface";

// Data / Constants
import { sideMenu } from "@template/common/sideMenu";

const SideBar: React.FC<HeaderActionsProps> = () => {
  const { t, isItemActive } = useSideBar();
  const { user } = useAuth();

  const renderMenuItems = (items: MenuItem[]) =>
    items.map((item) => {
      const isActive = isItemActive(item);
      const Icon = item.icon;
      const label = item.label ?? "Unknown"; // fallback for undefined label
      const translatedLabel = t(label.toLowerCase());

      if (item.to) {
        return (
          <SidebarMenuItem key={label}>
            <SidebarMenuButton size="default" asChild data-active={isActive}>
              <Link href={item.to}>
                {Icon && <Icon className="mr-2 h-4 w-4" />}
                <span>{translatedLabel}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      }

      return (
        <SidebarMenuItem key={label}>
          <div className="px-2 py-1 font-medium flex items-center gap-2 opacity-70">
            {Icon && <Icon className="h-4 w-4" />}
            <span>{translatedLabel}</span>
          </div>
        </SidebarMenuItem>
      );
    });

  return (
    <Sidebar side="left" variant="sidebar" collapsible="offcanvas">
      <SidebarContent>
        <h1 className="text-2xl font-semibold p-4">LOGO</h1>
        {sideMenu.map((group) => (
          <SidebarGroup key={group.label ?? "unknown-group"}>
            {group.isGroupHead && (
              <SidebarGroupLabel>
                {t(group.label ?? "unknown")}
              </SidebarGroupLabel>
            )}

            <SidebarGroupContent>
              <SidebarMenu>
                {renderMenuItems(
                  group.children?.length
                    ? group.children.filter(
                        (child): child is MenuItem => !!child
                      )
                    : [group]
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        {user && (
          <NavUser
            user={user}
            showEmail={true}
            showLang={true}
            showTheme={true}
            showInfo={true}
          />
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideBar;
