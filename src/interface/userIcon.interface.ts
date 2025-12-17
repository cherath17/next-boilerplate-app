import type { OverlayPanel } from "primereact/overlaypanel";

export interface UserIconButton {
  styleCode: string;
  ref: React.RefObject<OverlayPanel | null>;
  userData: Record<string, any>;
}
