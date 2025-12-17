export interface MenuItem {
  label?: string;
  to?: string;
  active?: string[];
  icon?: React.ComponentType<any>;
  isGroupHead?: boolean;
  children?: MenuItem[];
  onClick?: () => void;
}
