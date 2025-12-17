export interface ModalConfig {
  title?: string;
  description?: string;
  onOk?: () => void;
  onCancel?: () => void;
}
