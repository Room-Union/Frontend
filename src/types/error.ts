import { ERROR_MESSAGES } from "@/constants/error-message";
import { FieldPath, FieldValues } from "react-hook-form";

export type ErrorMessageMap = typeof ERROR_MESSAGES;
export type ErrorCode = keyof ErrorMessageMap;
export type ErrorMessage = ErrorMessageMap[ErrorCode];

export type ErrorToast = {
  defaultType: "toast";
  message: string;
  subMessage?: string;
};

export type ErrorField<T extends FieldValues> = {
  defaultType: "field";
  field: FieldPath<T>;
  message: string;
  subMessage?: string;
};

export interface OverrideFieldError<T extends FieldValues> {
  code: ErrorCode;
  message?: string;
  field: FieldPath<T>;
}
