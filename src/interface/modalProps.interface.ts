export interface ModalTriggerProps {
  label: string;
  title?: string;
  description?: string;
  onOk?: () => void;
  onCancel?: () => void;
}
