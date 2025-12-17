"use client";

import {
  PermissionContextType,
  PermissionType,
} from "@/interface/permissionType.interface";
import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";

const PermissionContext = createContext<PermissionContextType | undefined>(
  undefined
);

export const PermissionProvider = ({ children }: { children: ReactNode }) => {
  const [permissions, setPermissions] = useState<PermissionType[]>([]);

  const hasPermission = useCallback(
    (perm: PermissionType) => permissions.includes(perm),
    [permissions]
  );

  return (
    <PermissionContext.Provider
      value={{ permissions, setPermissions, hasPermission }}
    >
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermission = (): PermissionContextType => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error("usePermission must be used within PermissionProvider");
  }
  return context;
};
