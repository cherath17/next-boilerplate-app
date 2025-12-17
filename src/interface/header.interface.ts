export interface UserButtonProps {
  className: string;
  onClick: (event: React.MouseEvent) => void;
  children: React.ReactNode;
}

export interface UserData {
  email?: string;
  fullName?: string;
}

export interface HeaderActions {
  onLogout: () => void;
  onToggleOverlay: (event: React.MouseEvent) => void;
}
