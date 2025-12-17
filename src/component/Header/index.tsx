"use client";

import type React from "react";
import style from "./Header.module.scss";

// Props
import type { HeaderActionsProps } from "@template/interface/headerActionsProp.interface";
import { SidebarTrigger } from "@/ui/sidebar";

// Components
import Breadcrumbs from "../Breadcrumbs";

const Header: React.FC<HeaderActionsProps> = ({ showSideBar }) => {
  return (
    <div className={style.container}>
      {/* Left Section */}
      <div className={style.pageInfo}>
        <span onClick={showSideBar} className={style.sidebarToggle}>
          {/* <MenuIcon /> */}
          <SidebarTrigger className="-ml-1" />
        </span>
        <span className={`custom_breadcrumbs ${style.breadcrumbs}`}>
          <Breadcrumbs showIcon={true} />
        </span>
      </div>
      {/* Right Section - Menubar */}
      {/* {user && (
        <div className="ml-auto">
          <NavUser
            user={user}
            showEmail={false}
            showLang={true}
            showTheme={true}
            showInfo={false}
          />
        </div>
      )} */}
    </div>
  );
};

export default Header;
