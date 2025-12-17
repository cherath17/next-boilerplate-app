export type PermissionType = string; // You can change to enum later

export interface PermissionContextType {
  permissions: PermissionType[];
  setPermissions: (perms: PermissionType[]) => void;
  hasPermission: (perm: PermissionType) => boolean;
}
