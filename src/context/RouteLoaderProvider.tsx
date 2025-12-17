"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { GlobalLoader } from "@/component/GlobalLoader";

export interface ProviderProps {
  children: React.ReactNode;
}

const RouteLoaderContext = createContext({ loading: false });

export function RouteLoaderProvider({ children }: ProviderProps) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <RouteLoaderContext.Provider value={{ loading }}>
      {loading && <GlobalLoader />}
      {children}
    </RouteLoaderContext.Provider>
  );
}

export const useRouteLoader = () => useContext(RouteLoaderContext);
