import { useRef } from "react";
import { UserState } from "@/interface/store.interface";
import { useUserStore } from "@/store/useUserStore";
import React from "react";

export const useHeader = () => {
  const overlayRef = useRef<any>(null);
  const { userData } = useUserStore() as UserState;

  const toggleOverlay = (event: React.MouseEvent) => {
    overlayRef.current?.toggle(event);
  };

  const getUserInitial = () => {
    return userData?.email?.substring(0, 1) ?? "";
  };

  return {
    overlayRef,
    // handleLogout,
    toggleOverlay,
    getUserInitial,
    userData,
  };
};
