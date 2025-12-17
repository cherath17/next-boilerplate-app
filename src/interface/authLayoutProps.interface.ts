import { ReactNode } from "react";

/** Props for AuthLayout */
export interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  footer?: boolean;
}
