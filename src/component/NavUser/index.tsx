"use client";

// React / Next
import React from "react";

// Shadcn Components
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/ui/avatar";
import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react";
import { User } from "@/interface/user.interface";
import LanguageSwitcher from "../Header/LanguageSwitcher";
import ThemeSwitcher from "../Header/ThemeSwitcher";
import { useAuth } from "@/context/AuthContext";
import { NavUserText } from "@/enum/nav.enum";
import { t } from "i18next";

export interface NavInterface {
  user: User;
  showEmail: boolean;
  showLang?: boolean;
  showTheme?: boolean;
  showInfo?: boolean;
}
export function NavUser({
  user,
  showEmail,
  showLang = false,
  showTheme = false,
  showInfo = false,
}: NavInterface) {
  const { isMobile } = useSidebar();
  const { logout } = useAuth();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="bg-transparent p-0 hover:bg-transparent"
          >
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-transparent"
            >
              <Avatar className="border-primary-mid h-12 max-h-[48px] w-12 rounded-lg bg-primary-menu text-primary-bgLight overflow-hidden">
                {user.avatar ? (
                  <AvatarImage src={user.avatar} alt={user.name} />
                ) : (
                  <AvatarFallback className="rounded-lg">
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>

              {showEmail && (
                <>
                  <div className="grid flex-1 text-left text-sm leading-tight ml-2">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="text-muted-foreground truncate text-xs">
                      {user.email}
                    </span>
                  </div>
                  <IconDotsVertical className="ml-auto h-4 w-4" />
                </>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="min-w-[14rem] rounded-lg mt-10 right-0"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-2 py-2 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    {user.avatar ? (
                      <AvatarImage src={user.avatar} alt={user.name} />
                    ) : (
                      <AvatarFallback className="rounded-lg">
                        {user.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="text-muted-foreground truncate text-xs">
                      {user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />
            </>

            {/* MENU GROUP */}
            {showInfo && (
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <IconUserCircle className="mr-2 h-4 w-4" />
                  {t("navUser.account")}
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <IconCreditCard className="mr-2 h-4 w-4" />
                  {t("navUser.billing")}
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <IconNotification className="mr-2 h-4 w-4" />
                  {t("navUser.notifications")}
                </DropdownMenuItem>
              </DropdownMenuGroup>
            )}

            {(showLang || showTheme) && <DropdownMenuSeparator />}

            <DropdownMenuLabel className="flex flex-col gap-2">
              {showLang && <LanguageSwitcher />}
              {showTheme && <ThemeSwitcher />}
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {/* LOGOUT */}
            <DropdownMenuItem onClick={logout}>
              <IconLogout className="mr-2 h-4 w-4" />
              {t("navUser.logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
