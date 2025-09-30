import { FieldError } from "react-hook-form";

interface StatusMessageProps {
  error: FieldError | undefined;
  isDirty: boolean;
  correctMessage?: string;
}
const StatusMessage = ({
  error,
  isDirty,
  correctMessage,
}: StatusMessageProps) => {
  return (
    <>
      {error && <div>{error?.message?.toString()}</div>}
      {isDirty && !error && <div>{correctMessage}</div>}
    </>
  );
};

export default StatusMessage;
