// React
import { useState } from "react";

// PrimeReact
import type { ToastMessage } from "primereact/toast";

// Hooks / Context
import { useToast } from "@template/context/ToastContext";
import { useNavigation } from "@template/hooks/useNavigation";
import useSWRMutation from "swr/mutation";

// Services / Utils
import templateService from "@template/services/template.service";
import { getAlertError } from "@template/utils/generateToast";
import { parseArray } from "@template/utils/parseArray";
import { emailRegex } from "@template/utils/pattern/email.regex";

// Enums
import { ServiceKey } from "@template/enum/service.enum";

export const useLogin = (
  toastShow: (message: ToastMessage) => void,
  updation: (data: Record<string, any>) => void
) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const { navigate } = useNavigation();
  const {
    trigger,
    isMutating,
    data,
    error: swrError,
  } = useSWRMutation(ServiceKey.LOGIN, () =>
    templateService.verifyUser(formData)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = (): boolean => {
    let valid = true;
    const error = [];
    if (!emailRegex.test(formData?.email ?? "")) {
      error.push("Please enter a valid email address");
      valid = false;
    }
    if (!formData?.password) {
      error.push("Password cannot be empty");
      valid = false;
    }
    if (!valid) toastShow(getAlertError(parseArray(error)));
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await trigger();
    } catch (err: any) {
      toastShow(getAlertError(err?.response?.data?.message));
    } finally {
      updation(formData);
      showToast("Saved successfully!", "success");
      navigate("/dashboard");
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isMutating,
    data,
    swrError,
  };
};
