import { cn } from "@/utils/cn";
import { FieldErrors, FieldValues } from "react-hook-form";

interface StatusMessageProps {
  name: string;
  errors: FieldErrors<FieldValues>;
  isDirty: Partial<Record<string, boolean>>;
  correctMessage?: string;
  className?: string;
}
const StatusMessage = ({
  name,
  errors,
  isDirty,
  correctMessage,
  className,
}: StatusMessageProps) => {
  // 해당 필드 에러
  const fieldError = errors[name];

  // 상태 메세지 공통 스타일
  const statusMessageBaseStyle = `px-[4px] typo-ui-xs-medium tb:typo-ui-sm-medium`;

  return (
    <>
      {fieldError ? (
        <div
          className={cn(
            "text-gray-neutral-400",
            statusMessageBaseStyle,
            className
          )}
        >
          {fieldError.message?.toString()}
        </div>
      ) : (
        correctMessage &&
        isDirty[name] && (
          <div
            className={cn("text-red-500", statusMessageBaseStyle, className)}
          >
            {correctMessage}
          </div>
        )
      )}
    </>
  );
};

export default StatusMessage;

// textarea일 경우 font size variant
// statusMessageVariants.textarea.<size | breakpoint_size>
export const statusMessageVariants = {
  textarea: {
    sm: "typo-ui-2xs-medium",
    md: "typo-ui-sm-medium",
    tb_md: "tb:typo-ui-sm-medium",
  },
};
