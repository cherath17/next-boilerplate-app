"use client";

// React
import React from "react";

// Components
import Header from "@template/component/Header";
import Sidebar from "@template/component/SideBar";

// Providers / Hooks
import { SidebarProvider, useSidebar } from "@/ui/sidebar";

// UI
import { Button } from "@/ui/button";

// Icons
import { PanelRightClose } from "lucide-react";

// Styles
import style from "./Layout.module.scss";

// Interface
import type { LayoutProps } from "@template/interface/layoutProps.interface";

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <LayoutContent className={className}>{children}</LayoutContent>
    </SidebarProvider>
  );
};

const LayoutContent: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => {
  const { toggleSidebar, open } = useSidebar();

  return (
    <div className={`${className} ${style.container}`}>
      {/* Sidebar */}
      <aside
        className={`${style.sidebarContainer} ${open ? style.sidebarOpen : ""}`}
      >
        <Button name="open" variant="default" size="icon">
          <PanelRightClose />
        </Button>
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div
        className={`${style.mainContainer} ${
          open ? style.mainContainerSidebarOpen : ""
        }`}
      >
        <Header showSideBar={toggleSidebar} />
        <main className={style.content}>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
