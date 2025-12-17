"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { NetworkContextProps } from "@/interface/networkContextProps.interface";
import { toast } from "sonner";

const NetworkContext = createContext<NetworkContextProps | null>(null);

export const NetworkProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [online, setOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );

  // ✅ track offline toast status safely
  const shownRef = useRef(false);

  useEffect(() => {
    const updateOnline = () => setOnline(navigator.onLine);

    window.addEventListener("online", updateOnline);
    window.addEventListener("offline", updateOnline);

    return () => {
      window.removeEventListener("online", updateOnline);
      window.removeEventListener("offline", updateOnline);
    };
  }, []);

  useEffect(() => {
    // Show offline or online notifications
    if (!online) {
      if (!shownRef.current) {
        shownRef.current = true;
        toast.error("You are offline. Some features may not work."); // offline
      }
    } else {
      if (shownRef.current) {
        toast.dismiss(); // remove previous offline toast
        toast.success("You are back online."); // online
        shownRef.current = false; // reset status
      }
    }
  }, [online]);
  return (
    <NetworkContext.Provider value={{ online }}>
      {/* <Toast ref={offlineToastRef} position="bottom-center" /> */}
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => {
  const ctx = useContext(NetworkContext);
  if (!ctx) throw new Error("useNetwork must be inside NetworkProvider");
  return ctx;
};
