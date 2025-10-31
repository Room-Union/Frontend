interface FieldErrorType {
  defaultType: "field";
  field: string;
  message: string;
}

interface ToastErrorType {
  defaultType: "toast";
  message: string;
  subMessage?: string;
}

export type ErrorType = ToastErrorType | FieldErrorType;
