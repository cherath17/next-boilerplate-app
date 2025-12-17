export interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export type LayoutContextType = {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
};
