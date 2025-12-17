"use client";

import { createContext, ReactNode, useContext, useRef } from "react";
import { Toast } from "primereact/toast";
import type { ToastMessage } from "primereact/toast";
import { useNetwork } from "@template/context/NetworkProvider";
import { ToastContextType } from "@/interface/toastContextType.interface";

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const toastRef = useRef<Toast>(null);
  const { online } = useNetwork();

  const showToast = (
    msg: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    if (!online) return; // block toast when offline

    const message: ToastMessage = {
      severity: type,
      summary:
        type === "success" ? "Success" : type === "error" ? "Error" : "Info",
      detail: msg,
      life: 3000,
    };

    toastRef.current?.show(message);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast ref={toastRef} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be inside ToastProvider");
  return ctx;
};
