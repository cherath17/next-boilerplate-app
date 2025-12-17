export interface ToastContextType {
  showToast: (msg: string, type?: "success" | "error" | "info") => void;
}
