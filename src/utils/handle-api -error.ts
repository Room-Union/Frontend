// shared/errors/handleApiError.ts
import { ERROR_MESSAGES } from "@/constants/error-message";
import axios from "axios";

import type { UseFormSetError } from "react-hook-form";

interface ErrorOverride {
  code: string;
  message?: string;
  subMessage?: string;
}

interface HandleApiErrorParams {
  error: unknown;
  setError?: UseFormSetError<any>;
  toast: (params: {
    message: string;
    subMessage?: string;
    type: "normal" | "error";
  }) => void;
  toastErrors?: ErrorOverride[];
}

export const handleApiError = ({
  error,
  setError,
  toast,
  toastErrors = [],
}: HandleApiErrorParams) => {
  if (!axios.isAxiosError(error)) return;

  const errorCode = error.response?.data.code;
  const errorInfo = ERROR_MESSAGES[errorCode] ?? ERROR_MESSAGES.DEFAULT;

  const matchedOverride = toastErrors.find((o) => o.code === errorCode);

  if (errorInfo.defaultType === "field" && setError) {
    if (matchedOverride?.code === errorCode) return;
    setError(errorInfo.field, { message: errorInfo.message });
    return;
  }

  if (errorInfo.defaultType === "field") return;

  const message = matchedOverride?.message ?? errorInfo.message;
  const subMessage = matchedOverride?.subMessage ?? errorInfo.subMessage ?? "";

  toast({
    type: "normal",
    message: message,
    ...(subMessage && { subMessage: subMessage }),
  });
};
