"use client";

import { ReactNode, createContext, useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/ui/dialog";
import { Button } from "@/ui/button";
import { ModalConfig } from "@/interface/modalConfig.interface";

const ModalContext = createContext<any>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState<ModalConfig>({});

  const openModal = (payload: ModalConfig) => {
    setConfig(payload);
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            {config.title && <DialogTitle>{config.title}</DialogTitle>}
            {config.description && (
              <DialogDescription>{config.description}</DialogDescription>
            )}
          </DialogHeader>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button
              variant="destructive"
              onClick={() => {
                config.onCancel?.();
                closeModal();
              }}
            >
              Cancel
            </Button>

            <Button
              variant="default"
              onClick={() => {
                config.onOk?.();
                closeModal();
              }}
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
