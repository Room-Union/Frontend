import { FieldErrors, FieldValues } from "react-hook-form";

interface StatusMessageProps {
  name: string;
  errors: FieldErrors<FieldValues>;
  isDirty: Partial<Record<string, boolean>>;
  correctMessage?: string;
}
const StatusMessage = ({
  name,
  errors,
  isDirty,
  correctMessage,
}: StatusMessageProps) => {
  const fieldError = errors[name];

  return (
    <>
      {fieldError && <div>{fieldError.message?.toString()}</div>}
      {isDirty[name] && !fieldError && <div>{correctMessage}</div>}
    </>
  );
};

export default StatusMessage;
