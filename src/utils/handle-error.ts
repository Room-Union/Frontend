import { ERROR_MESSAGES } from "@/constants/error-message";
import { ToastParams } from "@/store/toast-store";
import {
  ErrorCode,
  ErrorField,
  ErrorToast,
  OverrideFieldError,
} from "@/types/error";
import { SchemaType } from "@/types/schema";
import axios from "axios";
import { UseFormSetError } from "react-hook-form";

export interface HandleApiErrorProps {
  error: Error;
  setError?: UseFormSetError<SchemaType>;
  toast: (params: ToastParams) => void;
  fieldErrors?: OverrideFieldError<SchemaType>[];
}

const handleError = ({
  error,
  setError,
  toast,
  fieldErrors = [],
}: HandleApiErrorProps) => {
  if (!axios.isAxiosError(error)) return;

  const errorCode: ErrorCode = error.response?.data.code ?? "DEFAULT";

  const errorInfo: ErrorToast | ErrorField<SchemaType> =
    ERROR_MESSAGES[errorCode] ?? ERROR_MESSAGES["DEFAULT"];

  const overrideError = fieldErrors.filter((o) => o.code === errorCode);

  if (overrideError.length >= 1 && setError) {
    overrideError.forEach((error) => {
      setError(error.field, { message: error.message ?? errorInfo.message });
    });
    return;
  }

  if (errorInfo.defaultType === "field" && setError) {
    setError(errorInfo.field, { message: errorInfo.message });
    return;
  }

  if (errorInfo.defaultType === "toast") {
    toast({
      type: "normal",
      message: errorInfo.message,
      ...(errorInfo.subMessage && { subMessage: errorInfo.subMessage }),
    });
  }
};

export default handleError;
