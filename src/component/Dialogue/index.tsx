"use client";

import { ModalTriggerProps } from "@/interface/modalProps.interface";
import { Button } from "@/ui/button";

// Context
import { useModal } from "@template/context/ModalProvider";

export const ModalTrigger = ({
  label,
  title = "Modal Title",
  description,
  onOk,
  onCancel,
}: ModalTriggerProps) => {
  const { openModal } = useModal();

  return (
    <Button
      title={label}
      variant={"default"}
      onClick={() =>
        openModal({
          title,
          description,
          onOk,
          onCancel,
        })
      }
    >
      {label}
    </Button>
  );
};
