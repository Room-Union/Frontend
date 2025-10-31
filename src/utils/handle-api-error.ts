// shared/errors/handleApiError.ts

import { ERROR_MESSAGES } from "@/constants/error-message";
import {
  ErrorCode,
  ErrorField,
  ErrorToast,
  OverrideFieldError,
} from "@/types/error";
import { SignInSchemaType } from "@/validation/sign-in-validation";
import { SignUpSchemaType } from "@/validation/sign-up-validation";
import axios from "axios";

import { UseFormSetError } from "react-hook-form";

export interface ToastParams {
  type: "success" | "normal" | "error";
  message: string;
  subMessage?: string;
}

export interface HandleApiErrorProps {
  error: Error;
  setError?: UseFormSetError<SignUpSchemaType | SignInSchemaType>;
  toast: (params: ToastParams) => void;
  fieldErrors?: OverrideFieldError<SignUpSchemaType | SignInSchemaType>[];
}

export const handleApiError = ({
  error,
  setError,
  toast,
  fieldErrors = [],
}: HandleApiErrorProps) => {
  if (!axios.isAxiosError(error)) return;

  const errorCode: ErrorCode = error.response?.data.code ?? "DEFAULT";

  const errorInfo:
    | ErrorToast
    | ErrorField<SignUpSchemaType | SignInSchemaType> =
    ERROR_MESSAGES[errorCode];

  const overrideError = fieldErrors.find((o) => o.code === errorCode);
  const message = overrideError?.message ?? errorInfo.message;

  if (overrideError && setError) {
    const message = overrideError.message ?? errorInfo.message;
    setError(overrideError.field, { message: message });
  }

  if (errorInfo.defaultType === "field" && setError) {
    setError(errorInfo.field, { message: errorInfo.message });
    return;
  }

  if (errorInfo.defaultType === "toast") {
    toast({
      type: "normal",
      message: message,
      ...(errorInfo.subMessage && { subMessage: errorInfo.subMessage }),
    });
  }
};
