"use client";

// React
import type React from "react";

// Components
import Header from "@template/component/Header";
import SideBar from "@template/component/SideBar";

// Sidebar Provider + Inset
import { SidebarProvider, SidebarInset } from "@/ui/sidebar";

// Types
import type { LayoutProps } from "@template/interface/layoutProps.interface";

const DashBoardLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        {/* Sidebar renders itself for mobile & desktop */}
        <SideBar />
        {/* Main content */}
        <main className="p-3 bg-primary-bgLight w-full">
          <SidebarInset className="bg-white flex-1 rounded-xl overflow-hidden">
            <Header />
            <div className="md:p-4 py-6 h-[calc(100vh-100px)] overflow-auto">
              {children}
            </div>
          </SidebarInset>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashBoardLayout;
