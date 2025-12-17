export interface UserButtonProps {
  className: string;
  onClick: (event: React.MouseEvent) => void;
  children: React.ReactNode;
}
export interface HeaderActionsProps {
  isSidebarOpen?: boolean;
  showSideBar?: () => void;
  onLogout?: () => void;
  // onToggleOverlay: (event: React.MouseEvent) => void;
}
